<?php
require __DIR__ . "/mailing/mailfunction.php";
require __DIR__ . "/mailing/mailingvariables.php";

session_start();
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    echo json_encode([
        "status" => "error",
        "message" => "Method not allowed.",
    ]);
    exit;
}

if (!isLocalDevelopmentRequest() && !isAllowedOrigin()) {
    http_response_code(403);
    echo json_encode([
        "status" => "error",
        "message" => "Invalid request origin.",
    ]);
    exit;
}

if (!isLocalDevelopmentRequest() && isRateLimited()) {
    http_response_code(429);
    echo json_encode([
        "status" => "error",
        "message" => "Too many requests. Please wait a few minutes and try again.",
    ]);
    exit;
}

$name = trim($_POST["name"] ?? "");
$phone = trim($_POST["phone"] ?? "");
$email = trim($_POST["email"] ?? "");
$message = trim($_POST["message"] ?? "");
$honeypot = trim($_POST["company_reference_code"] ?? "");
$formStartedAt = (int) ($_POST["form_started_at"] ?? 0);

if ($honeypot !== "") {
    http_response_code(422);
    echo json_encode([
        "status" => "error",
        "message" => "Invalid form submission.",
    ]);
    exit;
}

if (!isLocalDevelopmentRequest() && ($formStartedAt <= 0 || (time() - $formStartedAt) < 3)) {
    http_response_code(422);
    echo json_encode([
        "status" => "error",
        "message" => "Please take a moment to complete the form before submitting.",
    ]);
    exit;
}

if ($name === "" || $phone === "" || $email === "") {
    http_response_code(422);
    echo json_encode([
        "status" => "error",
        "message" => "Name, phone, and email are required.",
    ]);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(422);
    echo json_encode([
        "status" => "error",
        "message" => "Please enter a valid email address.",
    ]);
    exit;
}

$normalizedPhone = preg_replace('/\D+/', '', $phone);

if ($normalizedPhone === null || strlen($normalizedPhone) < 7 || preg_match('/^(\d)\1+$/', $normalizedPhone)) {
    http_response_code(422);
    echo json_encode([
        "status" => "error",
        "message" => "Please enter a valid phone number.",
    ]);
    exit;
}

$safeName = htmlspecialchars($name, ENT_QUOTES, "UTF-8");
$safePhone = htmlspecialchars($phone, ENT_QUOTES, "UTF-8");
$safeEmail = htmlspecialchars($email, ENT_QUOTES, "UTF-8");
$safeMessage = nl2br(htmlspecialchars($message, ENT_QUOTES, "UTF-8"));

$body = "<div style=\"font-family: Helvetica Neue, Helvetica, Arial, sans-serif; background-color: #f4f4f4; padding: 20px;\">
  <div style=\"background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); padding: 25px; max-width: 600px; margin: auto;\">
    <h1 style=\"color: #4a4a4a; font-size: 24px; margin-bottom: 20px; text-align: center;\">Lead Basic Details</h1>
    <table cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" style=\"border-collapse: collapse; color: #555;\">
      <tr style=\"border-bottom: 1px solid #eaeaeb;\">
        <td style=\"padding: 12px 0; font-weight: bold; width: 30%;\">Name:</td>
        <td style=\"padding: 12px 0;\">{$safeName}</td>
      </tr>
      <tr style=\"border-bottom: 1px solid #eaeaeb;\">
        <td style=\"padding: 12px 0; font-weight: bold;\">Phone:</td>
        <td style=\"padding: 12px 0;\">{$safePhone}</td>
      </tr>
      <tr style=\"border-bottom: 1px solid #eaeaeb;\">
        <td style=\"padding: 12px 0; font-weight: bold;\">Email:</td>
        <td style=\"padding: 12px 0;\">{$safeEmail}</td>
      </tr>
      <tr>
        <td style=\"padding: 12px 0; font-weight: bold; vertical-align: top;\">Message:</td>
        <td style=\"padding: 12px 0;\">{$safeMessage}</td>
      </tr>
    </table>
  </div>
</div>";

$result = mailfunction($mail_receiver_email, $mail_receiver_name, $body, false);

if ($result["success"]) {
    echo json_encode([
        "status" => "success",
        "message" => "Thanks! We will contact you soon.",
    ]);
    exit;
}

http_response_code(500);
error_log("Contact form mail failed: " . ($result["error"] ?? "Unknown error"));
echo json_encode([
    "status" => "error",
    "message" => "Error sending message. Please try again.",
]);
?>
<?php
function isAllowedOrigin(): bool
{
    $host = $_SERVER["HTTP_HOST"] ?? "";
    $origin = $_SERVER["HTTP_ORIGIN"] ?? "";
    $referer = $_SERVER["HTTP_REFERER"] ?? "";

    foreach ([$origin, $referer] as $headerValue) {
        if ($headerValue === "") {
            continue;
        }

        $parsedHost = parse_url($headerValue, PHP_URL_HOST);
        if (is_string($parsedHost) && strcasecmp($parsedHost, $host) === 0) {
            return true;
        }
    }

    return $origin === "" && $referer === "";
}

function isLocalDevelopmentRequest(): bool
{
    $host = strtolower($_SERVER["HTTP_HOST"] ?? "");
    $remoteAddr = $_SERVER["REMOTE_ADDR"] ?? "";

    $localHosts = [
        "localhost",
        "127.0.0.1",
        "::1",
    ];

    if (in_array($host, $localHosts, true) || str_starts_with($host, "localhost:")) {
        return true;
    }

    return in_array($remoteAddr, ["127.0.0.1", "::1"], true);
}

function isRateLimited(): bool
{
    $windowSeconds = 600;
    $maxAttempts = 5;
    $ip = $_SERVER["REMOTE_ADDR"] ?? "unknown";
    $key = preg_replace('/[^A-Za-z0-9_\-]/', '_', $ip);
    $file = sys_get_temp_dir() . DIRECTORY_SEPARATOR . "benzaiten_contact_rate_" . $key . ".json";
    $now = time();
    $attempts = [];

    if (is_file($file)) {
        $raw = file_get_contents($file);
        $decoded = json_decode($raw ?: "[]", true);
        if (is_array($decoded)) {
            $attempts = array_filter($decoded, static function ($timestamp) use ($now, $windowSeconds) {
                return is_int($timestamp) && ($now - $timestamp) < $windowSeconds;
            });
        }
    }

    if (count($attempts) >= $maxAttempts) {
        return true;
    }

    $attempts[] = $now;
    @file_put_contents($file, json_encode(array_values($attempts)));
    return false;
}
?>

<?php
    $mail_host = getenv("MAIL_HOST") ?: "smtp.gmail.com";
    $mail_port = getenv("MAIL_PORT") ?: "587";
    $mail_sender_email = getenv("MAIL_SENDER_EMAIL") ?: ""; // sender
    $mail_sender_password = getenv("MAIL_SENDER_PASSWORD") ?: ""; // sender
    $mail_sender_name = getenv("MAIL_SENDER_NAME") ?: "Website Form";
    $mail_receiver_email = getenv("MAIL_RECEIVER_EMAIL") ?: ""; // receiver
    $mail_receiver_name = getenv("MAIL_RECEIVER_NAME") ?: "Company";

    $localConfig = __DIR__ . "/mailingvariables.local.php";
    if (is_file($localConfig)) {
        require $localConfig;
    }
?>

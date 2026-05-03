<?php

use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;

require __DIR__ . '/../vendor/autoload.php';
require __DIR__ . '/mailingvariables.php';

function mailfunction($mail_reciever_email, $mail_reciever_name, $mail_msg, $attachment = false)
{
    $receiverEmail = $mail_reciever_email ?: $GLOBALS['mail_receiver_email'];
    $receiverName = $mail_reciever_name ?: $GLOBALS['mail_receiver_name'];

    if (
        !$receiverEmail ||
        empty($GLOBALS['mail_sender_email']) ||
        empty($GLOBALS['mail_sender_password'])
    ) {
        return [
            'success' => false,
            'error' => 'Mail configuration is incomplete.',
        ];
    }

    try {
        $mail = new PHPMailer(true);
        $mail->isSMTP();

        // $mail->SMTPDebug = SMTP::DEBUG_SERVER;
        $mail->Host = $GLOBALS['mail_host'];
        $mail->Port = (int) $GLOBALS['mail_port'];
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->SMTPAuth = true;
        $mail->Username = $GLOBALS['mail_sender_email'];
        $mail->Password = $GLOBALS['mail_sender_password'];
        $mail->CharSet = 'UTF-8';

        $mail->setFrom($GLOBALS['mail_sender_email'], $GLOBALS['mail_sender_name']);
        $mail->addAddress($receiverEmail, $receiverName);
        $mail->Subject = 'Someone Contacted You!';
        $mail->isHTML(true);
        $mail->msgHTML($mail_msg);

        if ($attachment !== false) {
            $mail->addAttachment($attachment);
        }

        $mail->AltBody = 'A new website contact form submission was received.';
        $mail->send();

        return [
            'success' => true,
            'error' => null,
        ];
    } catch (Exception $exception) {
        return [
            'success' => false,
            'error' => $mail->ErrorInfo ?: $exception->getMessage(),
        ];
    }
}

?>

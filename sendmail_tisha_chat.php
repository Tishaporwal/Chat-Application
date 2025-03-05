<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'phpmailer-master/src/Exception.php';
require 'phpmailer-master/src/PHPMailer.php';
require 'phpmailer-master/src/SMTP.php';

// JSON Data Receive
$data = json_decode(file_get_contents("php://input"));

$sender = $data->sender;
$receiver = $data->receiver;
$message = $data->message;

// PHPMailer Setup
$mail = new PHPMailer(true);
try {
    $mail->isSMTP();
    $mail->Host       = 'smtp.gmail.com';
    $mail->SMTPAuth   = true;
    $mail->Username   = 'guptatisha819@gmail.com';
    $mail->Password   = 'eirhmpbntyqzamnm'; // App Password ka use karo
    $mail->SMTPSecure = 'tls';
    $mail->Port       = 587;

    $mail->setFrom('guptatisha819@gmail.com', 'OLX Banasthali Chat');
    $mail->addAddress($receiver);

    $mail->isHTML(true);
    $mail->Subject = 'New Message on OLX Banasthali Chat!';
    $mail->Body    = "<p><strong>$sender</strong> sent you a message:</p>
                      <p style='background:#f4f4f4; padding:10px; border-radius:5px;'>$message</p>
                      <p>Reply now!</p>";

    $mail->send();
    echo json_encode(["message" => "Email sent successfully!"]);
} catch (Exception $e) {
    echo json_encode(["error" => "Email sending failed: {$mail->ErrorInfo}"]);
}
?>



<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require  'phpmailer/src/Exception.php';
require 'phpmailer/src/PHPMailer.php';


// Проверяем, были ли отправлены данные с помощью POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
 
$mail = new PHPMailer(true);
$mail->CharSet = 'UTF-8';
 $mail->setLanguage('ru', 'phpmailer/language/');
 $mail->IsHTML(true);

    $mail->setFrom('hqtreejn@phelips.p-host.in', 'Alch');
// Кому отправить
$mail->addAddress('halbatros22@gmail.com');
// Тема письма
$mail->Subject ='Привет! Это "Alch"';

    //$userName = htmlspecialchars($_POST['name']);
    // Используем htmlspecialchars для защиты от XSS-атак

$body = '<h1>Встречайте супер письмо! </h1>';

if (trim(!empty($_POST['name']))) {
$body.= '<p><strong>Имя: </strong>'.$_POST['name'].'</p>';}


if(trim(!empty($_POST['email']))) {
$body.= '<p><strong>E-mail:</strong> '.$_POST['email'].'</p>';
}

if(trim(!empty($_POST['title']))){
$body.= '<p><strong>Заголовок:</strong>'.$_POST['title'].'</p>';
}

if(trim(!empty($_POST['textar']))){
$body.= '<p><strong>Cоoбщeние:</strong> '.$_POST['textar'].'</p>';}

  $mail->Body = $body;  

if (!$mail->send()) {
$message = 'Ошибка...';
} else {
    $message = 'Данные отправлены!';
}

$response = ['message' => ($body)];
header('Content-type: application/json');
    // Выводим приветствие
    echo json_encode($response);

}

?>
<?php
    if(
        (isset($_POST['name'])&&$_POST['name']!="")
        && (isset($_POST['tel'])&&$_POST['tel']!="")
        ) {
        $to = 'jelite.jam@gmail.com';
        $subject = 'Jelite';
        $message = '
                <html>
                    <head>
                        <title>'.$subject.'</title>
                    </head>
                    <body>
                        <p>Имя: '.$_POST['name'].'</p>
                        <p>Телефон: '.$_POST['tel'].'</p>
                        <p>Сообщение: '.$_POST['message'].'</p>                
                    </body>
                </html>';
        $headers  = "Content-type: text/html; charset=utf-8 \r\n";
        $headers  .= "From: Отправитель <adminjelite@jelitejam.com>\r\n";
        mail($to, $subject, $message, $headers);
    }
?>

<?php include ("block.php");?>
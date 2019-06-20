<?php
    if(
        (isset($_POST['name'])&&$_POST['name']!="")
        && (isset($_POST['city'])&&$_POST['city']!="")
        && (isset($_POST['email'])&&$_POST['email']!="")
        && (isset($_POST['tel'])&&$_POST['tel']!="")
        ) {
        $to = ' jelite.jam@gmail.com';
        $subject = 'Jelite';
        $object = json_decode($_POST['arrays']);
        $object1 = json_decode($_POST['arrays-addition']);

        $message = '
                <html>
                    <head>
                        <title>'.$subject.'</title>
                    </head>
                    <body>
                        <p>Имя: '.$_POST['name'].'</p>
                        <p>Количество: '.$_POST['number'].'</p>
                        <p>Город: '.$_POST['city'].'</p>
                        <p>Телефон: '.$_POST['tel'].'</p>
                        <p>Электронная почта: '.$_POST['email'].'</p>

                        ';
                            foreach ($object as $key => $val) {
                                $message .=  $val->name . ' <br> ' . $val->subname . ' <br> ' . $val->quantity . ' <br><br> ';
                            }
                            foreach ($object1 as $key => $val) {
                                $message .=  $val->name . ' <br> ' . $val->subname . ' <br> ' . $val->quantity . ' <br><br> ';
                            }
                        $message .= '
                        
                        


                        <p>Брендирование: '.$_POST['checkboxG1'].'</p>               
                    </body>
                </html>';
        $headers  = "Content-type: text/html; charset=utf-8 \r\n";
        $headers  .= "From: Отправитель <adminjelite@jelitejam.com>\r\n";
        mail($to, $subject, $message, $headers);
    }
?>

<link href="build/styles/style.min.css?v=0.002" rel="stylesheet">

<section id="greetings">
    <div class="text-wrapper" style="margin: auto; text-align: center;">
        <svg width="105" height="105" viewBox="0 0 105 105" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M89.623 15.3768C79.7071 5.46103 66.5232 0 52.5 0C38.4766 0 25.2925 5.46103 15.3768 15.3768C5.46082 25.2927 0 38.4768 0 52.5C0 66.5232 5.46082 79.7071 15.3768 89.623C25.2927 99.539 38.4766 105 52.5 105C66.5232 105 79.7071 99.539 89.623 89.623C99.539 79.7071 105 66.5232 105 52.5C105 38.4768 99.539 25.2929 89.623 15.3768ZM52.5 98.8477C26.9438 98.8477 6.15234 78.0562 6.15234 52.5C6.15234 26.9438 26.9438 6.15234 52.5 6.15234C78.0562 6.15234 98.8477 26.9438 98.8477 52.5C98.8477 78.0562 78.0562 98.8477 52.5 98.8477Z" fill="#AF910F"/>
            <path d="M77.5829 35.6546C76.3818 34.4536 74.434 34.4536 73.2328 35.6548L46.0684 62.8192L31.7689 48.5197C30.5678 47.3186 28.6199 47.3186 27.4186 48.5197C26.2172 49.7209 26.2172 51.6687 27.4186 52.8701L43.8931 69.3446C44.4938 69.9453 45.2811 70.2455 46.0682 70.2455C46.8553 70.2455 47.6428 69.9451 48.2432 69.3446L77.5829 40.0049C78.7843 38.8038 78.7843 36.8559 77.5829 35.6546Z" fill="#AF910F"/>
        </svg>
        <p class="first">
            Спасибо! <br> Ваша заявка принята.
        </p>
        <p class="second">
            Наш менеджер свяжется с Вами в ближайшее время.
        </p>
        <a href="https://jelitejam.com/#boxes">Выбрать еще набор</a>
    </div>
</section>
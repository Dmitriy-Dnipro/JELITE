<?php
/**
 * Created by PhpStorm.
 * User: rovsh
 * Date: 4/29/2017
 * Time: 6:45 PM
 */

setlocale(LC_TIME, "ru_RU");
date_default_timezone_set ( 'Europe/Moscow' );

?>
<!doctype html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    
</head>
<body>
<?php

$Levels = array(
    "7" => "7",
    "8" => "7, 8",
    "9" => "8, 9, 10",
    "10" => "9, 10",
    "11" => "10, 11",
    "12" => "11, 12",
    "13" => "11, 12, 13",
    "14" => "12, 13, 14"
);

$JSON_String = file_get_contents("http:/jelitejam.com/events-drak.php");

print_r($JSON_String);

$Decoded = json_decode($JSON_String, true);

echo json_last_error_msg();

//print_r($Decoded);

$Dragons = $Decoded['dragons'];

//print_r($Dragons);

?>
    <table class="locator">
        <tr>
            <th>
                Имя бота
            </th>
            <th>
                Прилетит в
            </th>
            <th>
                Через
            </th>
            <th>
                Локация
            </th>
            <th>
                Бой
            </th>
        </tr>
<?php

for ($i = 0; $i < count($Dragons); $i++)
{
    echo "<tr>";
    echo "<td colspan=5>";
    print("<strong>Драконы ".$Levels[$Dragons[$i]['level']]." ур.</strong>");
    echo "</td>";
    echo "</tr>";
    $Dragon_names = $Dragons[$i]['names'];
    for ($j = 0; $j < count($Dragon_names); $j++)
    {
        echo "<tr>";
        echo "<td>";
        echo "<img src=\"http://i.oldbk.com/i/align_4.9.gif\" alt=\"\" /><strong>".$Dragon_names[$j]['name']."</strong>[".$Dragons[$i]['level']."]";
        echo "<a href=\"http://capitalcity.oldbk.com/inf.php?login=".$Dragon_names[$j]['name']."\" target=\"_blank\" />";
        echo "<img src=\"http://i.oldbk.com/i/inf.gif\" alt=\"Инф. о ".$Dragon_names[$j]['name']."\" width=\"12\" height=\"11\" /></a>";
        echo "</td>";
        echo "<td>";
        print(date("d.m.Y, H:i",$Dragons[$i]['time']));
        echo "</td>";
        echo "<td>";
        print($Dragons[$i]['time_left']);
        echo "</td>";
        echo "<td>";
        print($Dragon_names[$j]['location']);
        echo "</td>";
        echo "<td>";
        if ($Dragon_names[$j]['link'] != "")
        {
            print("<a href=\"".$Dragon_names[$j]['link']."\" target=_blank><img src=\"http://i.oldbk.com/i/fighttype3.gif\" /></a>");
        } else {print("-");}
        echo "</td>";
        echo "</tr>";
    }
}

?>
    </table>
</body>
</html>
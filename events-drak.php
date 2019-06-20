<?php
/**
 * Created by PhpStorm.
 * User: rovsh
 * Date: 4/15/2017
 * Time: 12:30 AM
 */

setlocale(LC_TIME, "ru_RU");
date_default_timezone_set ( 'Europe/Moscow' );

function GetDragonDetails($Name) {

    //$Dragon_info = file_get_contents("http://capitalcity.oldbk.com/inf.php?login=".$Name);
    $Dragon_info = iconv("Windows-1251", "UTF-8//IGNORE", file_get_contents("http://capitalcity.oldbk.com/inf.php?login=".$Name));
    //$newStr = iconv("Windows-1251", "UTF-8//IGNORE", $RSSFeed);
    if (substr_count($Dragon_info,"logs.php") != 0) {
        $Dragon_Link_Position = strpos($Dragon_info, "logs.php") + 13;
        $Dragon_Link_End = strpos($Dragon_info, "\"", $Dragon_Link_Position);
        $Dragon_Link_Length = $Dragon_Link_End - $Dragon_Link_Position;
        $Dragon_Link = "http://capitalcity.oldbk.com/logs.php?log=" . substr($Dragon_info, $Dragon_Link_Position, $Dragon_Link_Length);

        $Dragon_Location_Position = strpos($Dragon_info, "<BR><CENTER><B>") + 16;
        $Dragon_Location_End = strpos($Dragon_info, "\"", $Dragon_Location_Position);
        $Dragon_Location_Length = $Dragon_Location_End - $Dragon_Location_Position;
        $Dragon_Location = substr($Dragon_info, $Dragon_Location_Position, $Dragon_Location_Length);

        $Dragon_Details = array(
            "Link" => $Dragon_Link,
            "Location" => $Dragon_Location
        );
        return $Dragon_Details;

    }
    $Dragon_Details = array(
        "Link" => "",
        "Location" => ""
    );
    return $Dragon_Details;
}

$EventsFeedText = file_get_contents("https://oldbk.com/api/doska_xml.php");
$EventsFeedXML = simplexml_load_string($EventsFeedText);

$Dragon_names = array(
    array("7", "Дракошик"),
    array("8", "Драконушка"),
    array("8", "Дракончик"),
    array("8", "Дракончиха"),
    array("9", "Дракон"),
    array("9", "Маленький Дракон"),
    array("9", "Младший Дракон"),
    array("10", "Средний Дракон"),
    array("10", "Злой Дракон"),
    array("10", "Темный Дракон"),
    array("10", "Страшный Дракон"),
    array("11", "Большой Дракон"),
    array("11", "Огромный Дракон"),
    array("12", "Злющий Драконище"),
    array("13", "Яростный Дракон"),
    array("13", "Свирепый Дракон"),
    array("14", "Легендарный Дракон"),
    array("99", "")
);

$Dragons = array();
$Chaos = array(
    array("name", ""),
    array("description", ""),
    array("bot_id", "")
);

foreach ($EventsFeedXML->event as $event)
{
    $tempstr = $event['name'];
    //var_dump($tempstr);
    //echo substr($tempstr, 0, 14);
    if (substr($tempstr, 0, 16) == "Атака на ")
    {
        //echo $tempstr;
        $Dragons[] = $event;
    }

    if (substr($tempstr, 0, 14) == "Исчадие")
    {
        //echo "Entered loop";
        $Chaos['name'] = $event['name'];
        $Chaos['description'] = $event['description'];
        $Chaos['bot_id'] = $event['bot_id'];
        $Chaos['bot_room'] = "";
        if (substr_count($event['description'], "Онлайн") != 0)
        {
            //echo $event['bot_room'];
            $Chaos['bot_room'] = $event['bot_room'];
        }

    }
}


//echo count($Dragons);



echo "{ \"dragons\" : [";

for ($i = 0; $i < count($Dragons); $i++)
{
    $ProperDate = date_create_from_format("Y.m.d G:i:s", $Dragons[$i]['outdate']);
    echo "{";
    echo "\"level\":\"" . $Dragons[$i]['level'] . "\",";
    $Hour = substr($Dragons[$i]['outdate'], 11, 2);
    $Minute = substr($Dragons[$i]['outdate'], 14, 2);
    $Second = substr($Dragons[$i]['outdate'], 17, 2);
    $Month = substr($Dragons[$i]['outdate'], 5, 2);
    $Day = substr($Dragons[$i]['outdate'], 8, 2);
    $Year = substr($Dragons[$i]['outdate'], 0, 4);

    $TimeStamp = mktime($Hour, $Minute, $Second, $Month, $Day, $Year);
    echo "\"time\":\"" .$TimeStamp. "\",";
    echo "\"time_left\":\"" . str_replace("через:","",$Dragons[$i]['description']) . "\",";
    echo "\"names\":[";

        for ($x = 0; $x < count($Dragon_names); $x++) {

            if ($Dragon_names[$x][0] == $Dragons[$i]['level']) {

                echo "{";
                echo "\"name\":\"" . $Dragon_names[$x][1] . "\",";
                if ($Dragons[$i]['description'] == "Атакуют город") {
                    $Dragon_Details = GetDragonDetails($Dragon_names[$x][1]);
                    echo "\"location\":\"" . $Dragon_Details['Location'] . "\",";
                    echo "\"link\":\"" . $Dragon_Details['Link'] . "\"";
                } else {
                    echo "\"location\":\"\",";
                    echo "\"link\":\"\"";
                }
                echo "}";
                if ($Dragon_names[$x][0] == $Dragon_names[$x+1][0]) {
                    echo ",";
                }
            }
        }
        echo "]}";


    if ($i < count($Dragons)-1)
    {
        echo ",";
    }

}

echo "]}";
//print_r($Chaos);
//Processing Chaos
$Temp_Status = "";

$Tempstr = str_replace("Исчадие Хаоса ", "", $Chaos['description']);
//echo $Tempstr;
$Temp_Level = str_replace(")", "", substr($Tempstr, 1, 3));
//echo $Temp_Level;
$Tempstr2 = substr($Tempstr, 6);

if ($Tempstr2 == "Онлайн") $Temp_Status = "Online";

if (substr($Tempstr2, 0, 14) == "вырвусь") $Temp_Status = substr($Tempstr, -16);

//echo $Temp_Status;
/*
echo "{ \"chaos\" : [{";
echo "\"name\":\"".$Chaos['name']."\",";
echo "\"level\":\"".$Temp_Level."\",";
echo "\"status\":\"".$Temp_Status."\",";
echo "\"bot_room\":\"".$Chaos['bot_room']."\",";
//echo "\"description\":\"".$Chaos['description']."\",";
//echo "\"bot_room\":\"".$Chaos['bot_room']."\",";
echo "\"bot_id\":\"".$Chaos['bot_id']."\"";


echo "}]}";*/
<?php
$filename = 'sequence.json';
if ($_GET["m"] === "put") {
    file_put_contents($filename, json_encode($_POST["sequence"]));
}
else if ($_GET["m"] === "get") {
    echo file_get_contents($filename);
}
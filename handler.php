<?php
$filename = 'sequence.json';
if ($_GET["m"] === "put") {
    file_put_contents($filename, json_encode($_POST["sequence"]));
}
else if ($_GET["m"] === "get") {
    $new_array = [];
    foreach (json_decode(file_get_contents($filename)) as $value) {
        if (!empty($value)) {
            $new_array[] = $value;
        }
    }
    echo json_encode($new_array);
}
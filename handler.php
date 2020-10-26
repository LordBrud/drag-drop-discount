<?php
include 'elements.php';

$elements = new Elements();

$save_filename     = 'sequence.json';
$elements_filename = 'elements.json';

if (!isset($_GET["m"])) {
    return false;
}

if ($_GET["m"] === "put") {
    file_put_contents($save_filename, json_encode($_POST["sequence"]));
} else if ($_GET["m"] === "get") {
    $new_array = [];
    foreach (json_decode(file_get_contents($save_filename)) as $value) {
        if (!empty($value)) {
            $new_array[] = $value;
        }
    }
    echo json_encode($new_array);
} else {
    $elements_from_file = json_decode(file_get_contents($elements_filename));
    if ($_GET["m"] === "get_operands_dropdown") {
        echo $elements->create_dropdown($elements_from_file->operands, 'operands');
    } else if ($_GET["m"] === "get_variable_dropdown") {
        echo $elements->create_dropdown($elements_from_file->blocks->if, 'if_element');
    } else if ($_GET["m"] === "get_for_inputs") {
        echo $elements->create_for_loop_elements($elements_from_file->blocks->for);
    }
}
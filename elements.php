<?php

// TODO: use HTML Templates
class Elements {
    function create_dropdown($elements, $name) {
        $select = '<select disabled id="new_select" name="' . $name . '" class="custom-select">';
        foreach ($elements as $key => $label) {
            $select .= "<option value=\"" . $key . "\">" . $label . "</option>";
        }
        $select .= '</select>';
        return $select;
    }
}

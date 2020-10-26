<?php

// TODO: use HTML Templates
class Elements {
    function create_dropdown($elements, $name) {
        $select = '<select id="new_select" name="' . $name . '" class="custom-select">';
        foreach ($elements as $key => $label) {
            $select .= "<option value=\"" . $key . "\">" . $label . "</option>";
        }
        $select .= '</select>';
        return $select;
    }

    function create_textfield($name, $label) {
        $select = sprintf('<div><input id="new_input" name="%s" class="custom-input" placeholder="%s"></div>',
                          $name, $label);
        return $select;
    }

    function create_for_loop_elements($elements) {
        $output = "";
        foreach ($elements as $key => $label) {
            $output .= $this->create_textfield($key, $label);
        }
        return $output;
    }

}

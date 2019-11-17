$(document).ready(function () {
    $('.draggable').draggable({
        connectToSortable: "#sortable",
        helper: "clone",
        revert: "invalid",
        stop: function () {
            $('.draggable').css('width', '').css('height', '')
        },
        cursorAt: {top: 20, left: 30},
    });
    $("#sortable").sortable({
        revert: true,
        placeholder: "placeholder-highlight"
    });
});

$('#savePositions').click(function () {
    save_sequence(get_current_sequence());
});

$('#getPositions').click(function () {
    let saved_sequence = get_saved_sequence();
    if (!saved_sequence.equals(get_current_sequence())) {
        if (confirm('There are unsaved changes. Continue?')) {
            print_sequence(get_saved_sequence());
        }
    }
});


function get_current_sequence() {
    let $elements = $('#sortable')[0].children;
    let sequence = [];
    for (var i = 0 in $elements) {
        if ($elements.hasOwnProperty(i)) {
            let identifier = $elements[i].dataset.identifier;
            if (identifier !== '') {
                sequence.push(identifier);
            }
        }
    }
    return sequence;
}

function get_saved_sequence() {
    let call = $.ajax({
        method: "POST",
        url: "handler.php?m=get",
        async: false,
    });
    return JSON.parse(call.responseText);
}

function print_sequence(sequence) {
    let $sortable = $("#sortable");
    $sortable.html('');
    for (var i = 0 in sequence) {
        if (sequence.hasOwnProperty(i)) {
            let $element = $('#' + sequence[i]).clone();
            $element.attr("id", "");
            $sortable.append($element);
        }
    }
}

function save_sequence(sequence) {
    $.ajax({
        method: "POST",
        url: "handler.php?m=put",
        data: {sequence}
    }).success(function () {
        $('#toast_saved').toast('show');
    });
}

Array.prototype.equals = function (array) {
    // if the other array is a falsy value, return
    if (!array)
        return false;

    // compare lengths - can save a lot of time
    if (this.length != array.length)
        return false;

    for (var i = 0, l=this.length; i < l; i++) {
        // Check if we have nested arrays
        if (this[i] instanceof Array && array[i] instanceof Array) {
            // recurse into the nested arrays
            if (!this[i].equals(array[i]))
                return false;
        }
        else if (this[i] != array[i]) {
            // Warning - two different object instances will never be equal: {x:20} != {x:20}
            return false;
        }
    }
    return true;
};
// Hide method from for-in loops
Object.defineProperty(Array.prototype, "equals", {enumerable: false});
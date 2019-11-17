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
    if (get_saved_sequence() === get_current_sequence() || confirm('There are unsaved changes. Continue?')) {
        print_saved_sequence();
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

function print_saved_sequence() {
    let $sortable = $("#sortable");
    $sortable.html('');
    let sequence = get_saved_sequence();
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
$(document).ready(function() {
    $('.new-tweet textarea').on('keypress', function() {
        setCounter(this);
        // console.log($(this));
    });

    $('.new-tweet textarea').on('keydown', function(event) {
        if (event.keyCode === 8 || event.keyCode === 46) {
            setCounter(this);
        }
    });

    function setCounter(self) {
        const text = $(self).context.value;
        const textLength = text.length + 1;
        const counter = $(self).parent().children().last();
        counter.text(140 - textLength);
        if (140 - textLength < 0) {
            counter.addClass('invalid');
        }
        if (140 - textLength >= 0) {
            counter.removeClass('invalid');
        }
    }
});
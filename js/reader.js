$(function () {
    $('.item').click(function () {
        if (!$(this).parent().hasClass("current")) {
            $('.article').removeClass('current');
            $('.description').hide();

            $(this).parent().addClass('current');
            $(this).parent().children('.description').show();
        } else {
            $('.current').children('.description').toggle();
        }
    });

    $(document).keypress(function (event) {
        var currentArticle = $('.current');
        var nextArticle = currentArticle.next();
        var prevArticle = currentArticle.prev();
        if (nextArticle.length === 0) {
            nextArticle = $('.article').first();
        }
        if (prevArticle.length === 0) {
            prevArticle = $('.article').last();
        }

        if (event.which === 111) { // the key o is pressed!
            $('.current').children('.description').toggle();
        }
        else if (event.which === 110) { // the key is n
            nextArticle.children('.item').click();
        } else if (event.which === 112) { // the key is p
            prevArticle.children('.item').click();
        } else if (event.which === 109) { // the key is m
            currentArticle.removeClass('current')
            nextArticle.addClass('current');
        } else if (event.which === 98) { // the key is b
            currentArticle.removeClass('current')
            prevArticle.addClass('current');
        }

        // console.log(event.which);
    });
});
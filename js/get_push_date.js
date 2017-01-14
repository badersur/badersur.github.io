env.addFilter('year', function (dateString) {
    return (new Date(dateString)).getUTCFullYear();
});
$.ajax('https://api.github.com/repos/badersur/badersur.github.io')
    .done(function (data) {
        $('.text-muted').append(env.render('footer_text.html', { data: data }));
    });
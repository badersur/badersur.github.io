$.ajax('https://api.github.com/repos/badersur/badersur.github.io')
    .done(function (data) {
        var push_date = new Date(data.pushed_at);
        $('.text-muted').append(push_date.toString() + '.');
    });
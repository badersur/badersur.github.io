var env = nunjucks.configure('/views', { autoescape: true });
env.addFilter('pretty_date', function (dateString) {
    return moment(dateString).fromNow();
});
env.addFilter('friendly_date', function (dateString) {
    // "Sunday, February 14th 2010, 3:25:50 pm"
    return moment(dateString).format("dddd, MMMM Do YYYY, h:mm:ss a");
});
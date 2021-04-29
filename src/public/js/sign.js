$(document).ready(() => {
    let path = window.location.hash
    if (path == "#register") {
        $(".wide").toggleClass("translateX")
    }
})

var datetime = null, date = null;

var update = function() {
    moment.locale('es');
    date = moment(new Date());
    datetime = date.format('MMMM YYYY');
    datetime = datetime.toString();
    datetime = datetime.charAt(0).toUpperCase() + datetime.slice(1)
};

$(document).ready(function() {
    update();
    $("#date").val(datetime)
});
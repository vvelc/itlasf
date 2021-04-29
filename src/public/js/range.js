$(document).ready(() => {
    if ($(".range").html() == "NOVATO") {
        $(".range").addClass("dark")
        $(".range").css("background-color", "#FFFFFF")
    }
    if ($(".range").html() == "PLATA") {
        $(".range").addClass("dark")
        $(".range").css("background-color", "#DDDDDD")
    }
    if ($(".range").html() == "ORO") {
        $(".range").addClass("dark")
        $(".range").css("background-color", "#FFFF0D")
    }
    if ($(".range").html() == "RUBÍ") {
        $(".range").addClass("light")
        $(".range").css("background-color", "#E5223E")
    }
    if ($(".range").html() == "ZAFIRO") {
        $(".range").addClass("light")
        $(".range").css("background-color", "#061Aff")
    }
    if ($(".range").html() == "ESMERALDA") {
        $(".range").addClass("dark")
        $(".range").css("background-color", "#98E517")
    }
    if ($(".range").html() == "LEYENDA") {
        $(".range").addClass("light")
        $(".range").css("background-color", "#222222")
    }
    if ($(".range").html() == "STAFF") {
        $(".range").addClass("dark")
        $(".range").css("background-color", "#00FFFF")
    }
})
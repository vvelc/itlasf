$("#navbar-btn").click( () =>{
    $(".sidebar").toggleClass("sidebar-show")
})
$(".main").click( () =>{
    $(".sidebar").removeClass("sidebar-show")
})
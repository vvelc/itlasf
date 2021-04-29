const avisos = {
    emptyName: "El nombre no puede estar vacío",
    numberName: "El nombre no puede tener números",
    notITLA: "Este correo no pertenece al ITLA",
    shortPass: "La contraseña debe tener al menos 8 caracteres",
    notAlphaPass: "La contraseña debe tener números y letras",
    emptyPass: "La contraseña no puede estar vacía",
    notSamePass: "Las contraseñas no coinciden"
}

function validateForm() {
    //collect form data in JavaScript variables
    var name = document.getElementById("name").value;
    var lname = document.getElementById("lastname").value;
    var email = document.getElementById("email").value;
    var pw1 = document.getElementById("password1").value;  
    var pw2 = document.getElementById("password2").value;  
    
    //check if email is from ITLA
    if(!(/@itla.edu.do\s*$/.test(email))){
        document.getElementById("alert-box").classList.remove('d-none');
        document.getElementById("alert-text").innerHTML = avisos.notITLA;
        return false;
    }

    //check empty first name field  
    if(name == ""){
        document.getElementById("alert-box").classList.remove('d-none');
        document.getElementById("alert-text").innerHTML = avisos.emptyName;
        return false;
    }
      
    //character data validation  
    if(!isNaN(name)){
        document.getElementById("alert-box").classList.remove('d-none');
        document.getElementById("alert-text").innerHTML = avisos.numberName;
        return false; 
    }

    //check empty first name field  
    if(lname == ""){
        document.getElementById("alert-box").classList.remove('d-none');
        document.getElementById("alert-text").innerHTML = avisos.emptyName;
        return false;
    }
      
    //character data validation  
    if(!isNaN(lname)){
        document.getElementById("alert-box").classList.remove('d-none');
        document.getElementById("alert-text").innerHTML = avisos.numberName;
        return false; 
    }
    
    //check empty password field  
    if(pw1 == "") {  
        document.getElementById("alert-box").classList.remove('d-none');
        document.getElementById("alert-text").innerHTML = avisos.emptyPass;
        return false;
    }  
    
    //check empty confirm password field  
    if(pw2 == "") {  
        document.getElementById("alert-box").classList.remove('d-none');
        document.getElementById("alert-text").innerHTML = avisos.emptyPass;
        return false;
    }   
     
    //minimum password length validation  
    if(pw1.length < 8) {  
        document.getElementById("alert-box").classList.remove('d-none');
        document.getElementById("alert-text").innerHTML = avisos.shortPass;
        return false;
    }

    // check if if only nums 
    if(parseInt(pw1)) {
        document.getElementById("alert-box").classList.remove('d-none');
        document.getElementById("alert-text").innerHTML = avisos.notAlphaPass;
        return false;
    }
    // check if only has letters
    function hasNumbers(pw){
        let regex = /\d/g;
        return regex.test(pw);
    }
    if(!hasNumbers(pw1)){
        document.getElementById("alert-box").classList.remove('d-none');
        document.getElementById("alert-text").innerHTML = avisos.notAlphaPass;
        return false;
    }

    if(pw1 != pw2) {  
        document.getElementById("alert-box").classList.remove('d-none');
        document.getElementById("alert-text").innerHTML = avisos.notSamePass;
        return false;
    }
}
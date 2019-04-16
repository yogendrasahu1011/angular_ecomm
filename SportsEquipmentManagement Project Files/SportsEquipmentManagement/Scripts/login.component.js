var myInput = document.getElementById("psw");
var letter = document.getElementById("letter");
var capital = document.getElementById("capital");
var number = document.getElementById("number");
var length = document.getElementById("length");

// When the user clicks on the password field, show the message box
//myInput.onfocus = function () {
//    document.getElementById("message").style.display = "block";
//}

// When the user clicks outside of the password field, hide the message box
//myInput.onblur = function () {
//    document.getElementById("message").style.display = "none";
//}

// When the user starts to type something inside the password field
function emailCheck() {
    var email_field = document.getElementById("email_field").value;
    // Validate lowercase letters
    //var lowerCaseLetters = /[a-z]/g;
    //if (email_field.value.match(lowerCaseLetters)) {
    //    letter.classList.remove("invalid");
    //    letter.classList.add("valid");
    //} else {
    //    letter.classList.remove("valid");
    //    letter.classList.add("invalid");
    //}

    //// Validate capital letters
    //var upperCaseLetters = /[A-Z]/g;
    //if (email_field.value.match(upperCaseLetters)) {
    //    capital.classList.remove("invalid");
    //    capital.classList.add("valid");
    //} else {
    //    capital.classList.remove("valid");
    //    capital.classList.add("invalid");
    //}

    //// Validate numbers
    //var numbers = /[0-9]/g;
    //if (email_field.value.match(numbers)) {
    //    number.classList.remove("invalid");
    //    number.classList.add("valid");
    //} else {
    //    number.classList.remove("valid");
    //    number.classList.add("invalid");
    //}

    // Validate length
    if (email_field.length <= 8) {
        document.getElementById("email_field").style.borderColor = "#E34234";
        document.getElementById("email_message").innerHTML = "Must contain @";
    } else {
        document.getElementById("email_field").style.borderColor = "grey";
        document.getElementById("email_message").innerHTML = "";
    }
}

//password and confirm password
function passMatch() {
    var pass1 = document.getElementById("pass1").value;
    var pass2 = document.getElementById("pass2").value;
    var btn_Add = document.getElementById("btn_Add").value;
  
    if (pass1 != pass2) {
        //alert("Passwords Do not match");
        document.getElementById("pass1").style.borderColor = "#E34234";
        document.getElementById("pass2").style.borderColor = "#E34234";
        document.getElementById("pass1").value = "";
        document.getElementById("pass2").value = "";
        alert("Passwords Do Not Match!!!");    
        document.getElementById("btn_Add").style.display = "none";
    }
    else {
        
        document.getElementById("btn_Add").style.display = "inline-block";

      
    }
    
}

//on Add button and cancel button
function AddCan() {
    document.getElementById("pass1").value="";
    document.getElementById("pass2").value="";
    document.getElementById("btn_Add").style.display = "none";
}




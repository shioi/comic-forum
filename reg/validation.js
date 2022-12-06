let nameval = phval = mailval = passval = false;

function checkuname(){
    const namepattern = /^[a-zA-Z]+$/;
    let uname = document.getElementById('uname').value;
    if (!namepattern.test(uname)){
        document.getElementById('uname').value = document.getElementById('uname').value.replace(/[^a-zA-Z]+/, '');
        
        document.getElementById('wrongname').innerHTML = 
        "Only alphabets allowed<br>";
        nameval = false;
    }
    else {
        document.getElementById('wrongname').innerHTML = ''
        nameval = true;
    }
}

function checkphnumber() {
    const phpattern = /^\d+$/;
    let phnum = document.getElementById('phno').value;
    if (!phpattern.test(phnum)){
        document.getElementById('phno').value = '';
        document.getElementById('wrongnumber').innerHTML = 
        "Only numbers allowed<br>";
        phval = false;
}
else {
    if (phnum.length > 10) {
        document.getElementById('wrongnumber').innerHTML = 
        "Only 10 numbers allowed<br>";
        phval = false;
    }
    else{
        document.getElementById('wrongnumber').innerHTML = ''
        phval = true;
    }
}
}

function checkmail(){
    const mailpatternm = /^[a-zA-z]+.*@((gmail.com)|(protonmail.com))$/;
    let mail = document.getElementById('email').value;
    if (!mailpatternm.test(mail)){
        document.getElementById('wrongmail').innerHTML = 
        "invalid mail. Enter again";
        mailval = false;
    }
    else{
        document.getElementById('wrongmail').innerHTML = '';
        mailval = true;
    }
}

function checkpassword() {
    const passpattern = /^.(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[~`()_+={}[\]|,:;"<>.\/\#?!@$%^&*-]).{7,}.$/;
    let pass = document.getElementById("pass").value;
        passsubstring = pass.substring(0,pass.length-1);
    if (!passpattern.test(passsubstring)){
        document.getElementById('passwrong').innerHTML = 
        "<ul><li>A minimum of 1 lowercase and uppercase letter</li><li>minimum of 1 numeric character and special character</li><li>minimum length is 8 characters</li></ul>"
        passval = false;
    }
    else {
        document.getElementById('passwrong').innerHTML = '';
        passval = true;
    }
}

function showpassword() {
    let checkpass = document.getElementById("pass");
    if (checkpass.type === "password" )
        checkpass.type = "text";
    else
        checkpass.type = "password";
}

function validated(){
    if (mailval == true && phval == true &&  nameval == true && passval == true) {
        return true;
    }
    else {
        return false;
    }
}
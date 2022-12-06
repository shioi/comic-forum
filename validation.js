function validate() {
    let phonenumber = document.getElementById("phno").value;
    
    const pattern  = /\d[10]/;
    if(!pattern.test(phonenumber))
    {
        alert("error!! enter valid number");
        document.getElementById("phno").value = '';
        return false;
    }
}
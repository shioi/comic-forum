
function setnight(){
    document.getElementById("thememodes").href = "stylenight.css";
    setCookie("setnight()");
}

function setday(){
    document.getElementById("thememodes").href = "styleday.css";
    setCookie("setday()");
}

//getting json

async function populate(filename)
{
    
    let response = await fetch("domparser/json/" + filename);

    if(response.ok) {
        let json = await response.json();

        fillupcomics(json);
    } else {
        alert("HTTP-Error: " + response.status);
    }
    
}

function fillupcomics(comics) {


    const section = document.querySelector('.side');
    section.innerHTML = "";

    for (var key in comics) {
        const myArticle = document.createElement('a');   
        myArticle.className = "content";
        const description = document.createElement('div');
        description.className = "description";
        const title = document.createElement('div');
        title.className="title";
        const author = document.createElement('div');
        author.className="author";
        const image = document.createElement('img');
        image.className = "cover";
        const favourite = document.createElement('a');
        const reading = document.createElement('a');
        
        title.textContent = comics[key].Title;
        author.textContent = comics[key].Author;
        favourite.textContent = "Favourite|";
        reading.textContent = "ReadNow?";
        favourite.id = title.textContent;
        reading.id = title.textContent;
        favourite.onclick = storefav;
        reading.onclick = storeread;
        image["src"] = "./domparser/json/covers/" + comics[key].coverimage;
        myArticle.appendChild(image);
        description.appendChild(title);
        description.appendChild(author);
        myArticle.append(description);
        myArticle.append(favourite);
        myArticle.append(reading);
        section.append(myArticle);
    }
    

    
}
function setadventure() {    
    populate("adventure.json");
    setTasteCookie("setadventure()");
}

function setsol() {    
    populate("sliceoflife.json");
    setTasteCookie("setsol()");
}

function setCookie(val) {
    document.cookie = val+"; expires=23 Dec 2022 12:00:00 UTC path=/";
    var cookies = document.cookie.split(';');
    console.log(cookies);
}

function getCookie() {
    var cookies = document.cookie.split(';');
    eval(cookies[5]);
    eval(cookies[4].split("=")[1]);
    console.log(cookies);
}

function setTasteCookie(val) {
    document.cookie = "taste="+val+"; expires=25 Dec 2022 12:00:00 UTC path=/";
    var cookies = document.cookie.split(';');
    console.log(cookies);
}

getCookie();

function storefav() {
    alert(this.id+"Added!!");
    localStorage.setItem(this.id,localStorage.length-1);
    total_number++;
}

function showfavourites() {
    const val=localStorage.getItem(1);
    console.log(val);
}

function storeread() {
    sessionStorage.setItem(this.id,sessionStorage.length-1);
    total_number_session++;
}


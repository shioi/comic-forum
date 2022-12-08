async function populate(filename)
{
    
    let response = await fetch("domparser/json/sliceoflife.json");
    let response2 = await fetch("domparser/json/adventure.json");

    if(response.ok && response2.ok) {
        let json1 = await response.json();
        let json2 = await response2.json();
        let json = json1.concat(json2);

        fillupcomics(json);
    } else {
        alert("HTTP-Error: " + response.status);
    }
    
}

function fillupcomics(comics) {


    const section = document.querySelector('.side');
    section.innerHTML = "";
    
    for (var key in comics) {
        for (var i = 0; i <=localStorage.length; i++){
            const item = localStorage.key(i);
            if (item == comics[key].Title){
        
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
            const unfavourite = document.createElement('a');
            
            
            title.textContent = comics[key].Title;
            author.textContent = comics[key].Author;
            unfavourite.textContent = "unFavourite|";
            unfavourite.id = title.textContent;
            unfavourite.onclick = removeFavourite;
            image["src"] = "./domparser/json/covers/" + comics[key].coverimage;
            myArticle.appendChild(image);
            description.appendChild(title);
            description.appendChild(author);
            myArticle.append(description);
            myArticle.append(unfavourite);
            section.append(myArticle);
        }
}
}
}

function removeFavourite(){
    localStorage.removeItem(this.id);
    populate();
}

populate();


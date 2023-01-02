const fs = require('fs');
const express = require('express')

const app = express();

app.use(express.static(__dirname))
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile('index.html', { root: __dirname });
});

app.get('/favourites', (req, res) => {
    const data = require('./favourite.json')
    res.render('fav', { data: data })
})

//normal function
function replaceLastOccurrence(string, replacement) {
    const lastIndex = string.lastIndexOf(',');
    const arr = string.split('');
    arr[lastIndex] = replacement;
    return arr.join('');
}

app.post('/index.html', (req, res) => {
    console.log(req.body);
    let firstValue = false;
    const readStream = fs.createReadStream('./domparser/json/adventure.json')
    let writeData = '';
    const writeStream = fs.createWriteStream('./searched.json')
    readStream.on('data', (chunk) => {
        jsondata = JSON.parse(chunk.toString());
        //console.log(jsondata);
        for (let index = 0; index < jsondata.length; index += 1) {
            if (jsondata[index].Title.includes(req.body.searchedname)) {
                if (firstValue == false) {
                    firstValue = true;
                    writeData += '['
                }
                dta = jsondata[index];
                console.log(dta);
                writeData += JSON.stringify(dta) + ','
            }
        }
        if (firstValue == true) {
            writeStream.write(replaceLastOccurrence(writeData, ']'))
        }

        const data = require('./searched.json');
        console.log(data);
        res.render('searched.ejs', { data: data });

    })

})

app.listen(3000)
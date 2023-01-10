const fs = require('fs');
const express = require('express')
const mysqlconnection = require('./mysqlconnection');
const app = express();
const mysql = require("mysql");
app.use(express.static(__dirname))
app.use(express.static(__dirname + '/public'))
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

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
                let dta = jsondata[index];
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


app.get('/login', (req, res) => {
    res.sendFile('./login.html', { root: __dirname });
})

app.post('/login', (req, res) => {
    data = req.body;
    console.log(data.name, data.password)
    let matched = false
    mysqlconnection.connection.query('SELECT * from User',
        (err, rows) => {
            if (err) throw err;
            for (let i = 0; i < rows.length; i++) {
                console.log(rows[i])
                if (data.name == rows[i].name && data.password == rows[i].password) {
                    matched = true;
                    break;
                }
            }
            if (matched) {
                console.log("ist matched")
                res.render('accountpage', { account: data })
            }
            else {
                console.log("not matched")
                res.redirect('/login')
            }
        })
})

app.post('/index', (req, res) => {
    console.log(req.body)
    mysqlconnection.addRow(req.body)
    res.redirect('/login')
})

app.listen(3000, () => {
    console.log('server if running at port 30000')
})

app.delete('/account/:id', (req, res) => {
    const id = req.params.id;
    mysqlconnection.connection.query("SET FOREIGN_KEY_CHECKS=0");
    const deleteQuery = `DELETE FROM User where name="${id}"`;
    console.log(deleteQuery);
    mysqlconnection.connection.query(deleteQuery, (err, response) => {
        if (err) {
            console.error(err);
            return;
        }
        // rows deleted
        res.json({ redirect: '/login' })
    });
})

app.get('/account/:id', (req, res) => {
    const id = req.params.id;
    mysqlconnection.connection.query("SET FOREIGN_KEY_CHECKS=0");
    const deleteQuery = `DELETE FROM User where name="${id}"`;
    console.log(deleteQuery);
    mysqlconnection.connection.query(deleteQuery, (err, response) => {
        if (err) {
            console.error(err);
            return;
        }
        // rows deleted
        res.json({ redirect: '/login' })
    });
})

app.post('/updatepass')
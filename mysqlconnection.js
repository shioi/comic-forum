const mysql = require('mysql')

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'fut',
    password: 'De@thNot@..1',
    database: 'comicforum'
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL Server')
})

function addRow(data) {
    let insertQuery = "INSERT INTO ?? (??,??,??,??) VALUES (?,?,?,?)";
    let id = 4;
    let query = mysql.format(insertQuery, ['User', 'userid', 'name', 'email', 'password', id, data.username, data.email, data.password]);
    connection.query(query, (err, response) => {
        if (err) {
            console.error(err);
            return;
        }
        //rows added
        console.log(response.insertId);
    })
}


module.exports = { connection, addRow };
var mysql = require('mysql');

var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'rootuser'
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected");
    con.query('INSERT INTO mydb.users(name) VALUES(3)', function (err, result, fields) {
        if (err) throw err;
        console.log(JSON.stringify(result));
    });
});

// use info from mysql server configuration 
// localhost:3306
const mysql = require('mysql');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'rootuser'
});

console.log("Connected")

pool.query('select * from test_database.users', (err, res)=>{
    return console.log(res)
});

// use info from mysql server configuration 
// localhost:3306
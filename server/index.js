const express = require('express');
const app = express();
const mysql = require('mysql');

mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "abood2110",
    database: "Blockvote",
});


app.post('/register', (req, res) => {
    const email = req.body.email;
    const publicKey = req.body.publicKey;
    const password = req.body.password;


    const sqlInsert = "INSERT INTO Accounts (email, publicKey) VALUES (?,?)";
    db.query(sqlInsert, [email, publicKey], (err, result) => {
        
        if (err) {
            console.log(err);
        }
        else {
            res.send("values inserted");
        }
    });
});




app.post('/poll', (req, res) => {
    const pollID = req.body.pollID;
    const pollTitle = req.body.pollTitle;
    const pollAdminKey = req.body.pollAdminKey;
    const pollStartDate = req.body.pollStartDate;
    const pollEndDate = req.body.pollEndDate;


    const sqlInsert = "INSERT INTO Accounts (pollID, pollTitle, pollAdminKey, pollStartDate, pollEndDate) VALUES (?,?,?,?,?)";
    db.query(sqlInsert, [pollID, pollTitle, pollAdminKey, pollStartDate, pollEndDate], (err, result) => {
        
        if (err) {
            console.log(err);
        }
        else {
            res.send("values inserted");
        }
    });
});



app.post('/vote', (req, res) => {
    const publicKey = req.body.publicKey;
    const pollTitle = req.body.pollTitle;
    const vote = req.body.vote;
    const voteDate = req.body.voteDate;
    

    const sqlInsert = "INSERT INTO Accounts (publicKey, pollTitle, vote, voteDate) VALUES (?,?,?,?)";
    db.query(sqlInsert, [publicKey, pollTitle, vote, voteDate], (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send("values inserted");
        }
    });
});




app.listen(3001, () => {
  console.log('Server listening on port 3001');
});




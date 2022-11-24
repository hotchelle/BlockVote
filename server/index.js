const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());

mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "abood2110",
    database: "Blockvote",
});

// Insertion to database using POST method for user registration
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



// Insertion to database using POST method for poll creation
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


// Insertion to database using POST method for vote placement
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

//  insert a question to the database
app.post('/poll', (req, res) => {
  
    const pollID = req.body.pollID;
    const questionID = req.body.questionID;
    const questionType = req.body.questionType;
    const questionTitle = req.body.questionTitle;
    const questionAnswer = req.body.questionAnswer;



    
    const sqlInsert = "INSERT INTO QUESTIONS (pollID, questionID, questionType, questionTitle, questionAnswer) VALUES (?,?,?,?,?)";
    db.query(sqlInsert, [pollID, questionID, questionType, questionTitle, questionAnswer], (err, result) => {
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
    const PollID = req.body.PollID;
    const registrationDate = req.body.registrationDate;

    
    const sqlInsert = "INSERT INTO VOTERS (publicKey, PollID, registrationDate) VALUES (?,?,?)";
    db.query(sqlInsert, [publicKey, PollID, registrationDate], (err, result) => {
    if (err) {
            console.log(err);
        }
        else {
            res.send("values inserted");
        }
    });
});


// gets the poll history of a user
app.get('/pollhistory', (req, res) => {

    const sqlSelect = "SELECT pollTitle FROM POLL JOIN REGISTEREDVOTERS ON POLL.pollID = REGISTEREDVOTERS.pollID JOIN ACCOUNTS ON REGISTEREDVOTERS.publicKey = ACCOUNTS.publicKey WHERE ACCOUNTS.publicKey = ?";
    db.query(sqlSelect, [publicKey], (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send(result);
        }
    });
});

// gets the results of a poll
app.get('/pollresult', (req, res) => {
    const sqlSelect = "SELECT COUNT(VOTE), VOTE FROM POLL JOIN REGISTEREDVOTERS ON POLL.pollID = REGISTEREDVOTERS.pollID JOIN VOTES ON REGISTEREDVOTERS.publicKey = VOTES.publicKey WHERE POLL.pollID = ? GROUP BY VOTE";
    db.query(sqlSelect, [pollID], (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send(result);
        }
    });
});


// gets the pollID from the database
app.get('/pollresult', (req, res) => {
    const sqlSelect = "SELECT pollID FROM POLL JOIN REGISTEREDVOTERS ON POLL.pollID = REGISTEREDVOTERS.pollID JOIN ACCOUNTS ON REGISTEREDVOTERS.publicKey = ACCOUNTS.publicKey WHERE ACCOUNTS.publicKey = ?";
    db.query(sqlSelect, [publicKey], (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send(result);
        }
    });
});

// gets the user public key from the database

app.get('/pollresult', (req, res) => {
    const sqlSelect = "SELECT publicKey FROM ACCOUNTS WHERE email = ?";
    db.query(sqlSelect, [email], (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send(result);
        }
    });
});







app.listen(3001, () => {
  console.log('Server listening on port 3001');
});




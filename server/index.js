const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');
const bp = require('body-parser')

app.use(cors());

app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))


db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "password",
    database: "BlockVote",
});

// Insertion to database using POST method for user registration
app.post('/register', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const sqlInsert = "INSERT INTO Accounts (email, password) VALUES (?,?)";
    db.query(sqlInsert, [email, password], (err, result) => {
        if (err) {
            console.warn(err);
        }
        else {
            res.send("Success values inserted successfully !!! ");
        }
    });
});


app.post("/createPoll", (req, res ) => {
    const pollTitle = req.body.pollTitle
    const pollAdminAddr = req.body.pollAdminAddr
    const question = req.body.question
    const choices = req.body.choices


    const sqlInsert = "INSERT INTO Polls (pollTitle, pollAdminAddr,questions ,choices) VALUES (?,?,?,?)";
    db.query(sqlInsert, [pollTitle, pollAdminAddr,question, choices ], (err, result) => {
        if (err) {
            console.warn(err);
        }
        else {
            res.send("Success polly created successfully!! ");
        }
    });

})

app.get('/getQuestion', (req, res) => {
    const PollID = req.query.pollID;

    const sqlSelect = "SELECT questions, choices, pollTitle FROM POLLS WHERE pollID = ?";
    db.query(sqlSelect, [PollID], (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send(result);
        }
    })

});


app.post("/registerVoter", (req, res) => {
    const emailAddress = req.body.emailAddress
    const pollID  = req.body.pollID

    const sqlInsert = "INSERT INTO Polls (emailAddress, pollID) VALUES (?,?)";
    db.query(sqlSelect, [emailAddress,PollID], (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send(result);
        }
    })
})


app.get("/getRegisteredVoters", (req, res) => {
    const PollID = req.query.pollID;
    const sqlSelect = "SELECT emailAddress FROM RegisteredVoters WHERE pollID = ?";
    db.query(sqlSelect, [PollID], (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send(result);
        }
    })

})

app.post('/vote', (req, res) => {
    const userEmail = req.body.email;
    const pollId = req.body.pollId;
    const vote = req.body.vote;

    const sqlInsert = "INSERT INTO Votes (emailAddress, pollId, vote) VALUES (?, ?, ?)";
    db.query(sqlInsert, [userEmail, pollId, vote], (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send(result);
        }
    })

});


app.get('/answers', (req, res) => {
    const pollTitle = req.query.pollTitle;

    const sqlSelect = "SELECT Count(VOTE) as 'number', VOTE FROM VOTES JOIN POLLS ON POLLS.POLLID = VOTES.POLLID WHERE POLLS.POLLTITLE = ? group by VOTE";
    db.query(sqlSelect, [pollTitle], (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send(result);
        }
    })
})


app.get('/title', (req, res) => {
    const emailAddress = req.query.emailAddress;

    const sqlSelect = "SELECT DISTINCT POLLS.pollTitle FROM POLLS JOIN VOTES ON POLLS.POLLID = VOTES.POLLID WHERE VOTES.EMAILADDRESS = ?";
    db.query(sqlSelect, [emailAddress], (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send(result);
            console.log(result)
        }
    })
})


app.listen(3001, () => {
  console.log('Server listening on port 3001');
});




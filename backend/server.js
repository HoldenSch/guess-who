const express = require("express");
const mysql = require('mysql');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const app = express();

app.use(cors());
app.use(express.json());
session_id = 0;

// creates connection with MySQL
const db = mysql.createConnection({
    host: "34.67.36.184",
    user: "root",
    password: "}9ZYG'q'0Y\"T'xsG",
    database: "guess-who-database"
});

// validates if username is taken
app.post('/validate', (req, res) => {
    const sql = "SELECT * FROM `guess-who-database`.users WHERE `username` = ?";
    db.query(sql, [req.body.username], (err, data) => {
        // catches error when selecting
        if (err) {
            return res.json("Error");
        }
        // if 'SELECT' statement returns rows, username is taken
        else if (data.length > 0) {
            return res.json("Username taken");
        }
        // otherwise, username is not taken
        return res.json("Success");
    });
});

// registers the user
app.post('/register', (req, res) => {
    // generates salt encryption
    bcrypt.genSalt(10, (err1, salt) => {
        // catches error generating salt
        if (err1) {
          return res.json("Error");
        }
        // hashes password with salt
        bcrypt.hash(req.body.password.toString(), salt, (err2, hash) => {
            // catches error hashing
            if (err2) {
              return res.json("Error");
            }
            // inserts username and hash into table
            const sql = "INSERT INTO `guess-who-database`.users (`username`, `password_hash`) VALUES (?, ?);";
            db.query(sql, [req.body.username, hash], (err3, data) => {
                // catches error when inserting
                if (err3) {
                    return res.json("Error");
                }
                return res.json(data);
            });
        });
    });
});

// logs the user in
app.post('/login', (req, res) => {
    const sql = "SELECT * FROM `guess-who-database`.users WHERE `username` = ?";
    db.query(sql, [req.body.username], (err1, data) => {
        // catches error when selecting
        if (err1 || data.length === 0) {
            return res.json("Error");
        }
        // compares the password to the stored password hash
        bcrypt.compare(req.body.password.toString(), data[0].password_hash, (err2, result) => {
            // catches error when comparing passwords
            if (err2) {
                return res.json("Error");
            }
            // logs user in if passwords match
            if (result) {
                // sets session id to the user id
                session_id = data[0].id;
                return res.json('Success');
            } 
            // otherwise passwords do not match
            else {
                return res.json("Fail");
            }
        });
    })
});

// inserts name for user
app.post('/insert', (req, res) => {
    if (session_id === 0) {
        return res.json("Not Logged In");
    }
    const sql = "INSERT INTO `guess-who-database`.names (user_id, name) VALUES (?, ?);";
    db.query(sql, [session_id, req.body.content], (err1, data) => {
        // catches error when inserting
        if (err1) {
            return res.json("Error");
        }
        console.log(data.insertId);
        return res.json(data.insertId);
    });
});



// tells app to listen to port 8081
app.listen(8081, ()=> {
    console.log("listening");
});
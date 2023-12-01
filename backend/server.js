const express = require("express");
const mysql = require('mysql');
const cors = require('cors');
const bcrypt = require('bcryptjs');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "34.67.36.184",
    user: "root",
    password: "}9ZYG'q'0Y\"T'xsG",
    database: "guess-who-database"
})

app.post('/validate', (req, res) => {
    const sql = "SELECT * FROM `guess-who-database`.users WHERE `username` = ?";
    db.query(sql, [req.body.username], (err, data) => {
        if (err) {
            return res.json("Error");
        }
        else if (data.length > 0) {
            return res.json("Username taken");
        }
        return res.json("Success")
    })
})

app.post('/register', (req, res) => {
    bcrypt.genSalt(10, (err1, salt) => {
        if (err1) {
          console.error('Error generating salt:', err1);
          return res.json("Error");
        }
        bcrypt.hash(req.body.password.toString(), salt, (err2, hash) => {
            if (err2) {
                console.error('error hashing')
              return res.json("Error");
            }
            const sql = "INSERT INTO `guess-who-database`.users (`username`, `password_hash`) VALUES (?, ?);";
            db.query(sql, [req.body.username, hash], (err3, data) => {
                if (err3) {
                    console.log('error inserting');
                    return res.json("Error");
                }
                return res.json(data);
            })
        });
      });
})

app.post('/login', (req, res) => {
    const sql = "SELECT password_hash FROM `guess-who-database`.users WHERE `username` = ?";
    db.query(sql, [req.body.username], (err1, data) => {
        if (err1) {
            return res.json("Error");
        }
        if (data.length === 0) {
            return res.json("Error")
        }
        console.log(data);
        bcrypt.compare(req.body.password.toString(), data[0].password_hash, (err2, result) => {
            if (err2) {
              console.error('Error comparing passwords:', err2);
              return;
            }
            if (result) {
              console.log('Passwords match!');
              return res.json("Success");
            } else {
              console.log('Passwords do not match.');
              return res.json("Fail");
            }
          });
    })
})

app.listen(8081, ()=> {
    console.log("listening");
})
const express = require("express");
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "guess-who"
})

app.post('/validate', (req, res) => {
    const sql = "SELECT * FROM users WHERE `username` = ?";
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
    const sql = "INSERT INTO users (`username`, `password`) VALUES (?, ?)";
    db.query(sql, [req.body.username, req.body.password], (err, data) => {
        if (err) {
            console.log(err)
            return res.json("Error");
        }
        return res.json(data);
    })
})

app.post('/login', (req, res) => {
    const sql = "SELECT * FROM users WHERE `username` = ? AND `password` = ?";
    db.query(sql, [req.body.username, req.body.password], (err, data) => {
        if (err) {
            return res.json("Error");
        }
        if (data.length > 0) {
            return res.json("Success");
        }
        else {
            return res.json("Fail");
        }
    })
})

app.listen(8081, ()=> {
    console.log("listening");
})
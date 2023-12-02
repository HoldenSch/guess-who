const express = require("express");
const mysql = require('mysql');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const app = express();

app.use(cors());
app.use(express.json());
let session_id = 0;
let game_code = "";

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
    const sql = "INSERT INTO `guess-who-database`.names (user_id, name, image) VALUES (?, ?, ?);";
    db.query(sql, [session_id, req.body.content, req.body.image], (err1, data) => {
        // catches error when inserting
        if (err1) {

            return res.json("Error");
        }
        return res.json(data.insertId);
    });
});

// deletes name for user
app.post('/delete', (req, res) => {
    if (session_id === 0) {
        return res.json("Not Logged In");
    }
    const sql = "DELETE FROM `guess-who-database`.names WHERE id = ?;";
    db.query(sql, [req.body.id], (err1, data) => {
        // catches error when deleting
        if (err1) {
            console.log(err1);
            return res.json("Error");
        }
        return res.json(data);
    });
});

// retrieves friend names for user
app.post('/retrieve', (req, res) => {
    if (session_id === 0) {
        return res.json("Not Logged In");
    }
    const sql = "SELECT * FROM `guess-who-database`.names WHERE user_id = ?;";
    db.query(sql, [session_id], (err1, data) => {
        // catches error when deleting
        if (err1) {
            return res.json("Not Logged In");
        }
        return res.json(data);
    });
});

app.post('/play', (req, res) => {
    if (session_id === 0) {
        return res.json("Not Logged In");
    }
    const sql = "INSERT INTO `guess-who-database`.game_codes (user_id, code_name, names) VALUES (?, ?, ?);";
    db.query(sql, [session_id, req.body.code, req.body.friends.toString()], (err1, data) => {
        // catches error when inserting
        if (err1) {
            console.log(err1)
            return res.json("Error");
        }
        game_code = req.body.code.toString();
        return res.json(data.insertId);
    });
});

app.post('/host_join', async (req, res) => {
    if (session_id === 0) {
        return res.json("Not Logged In");
    }
    try {
        const sql = "SELECT * FROM `guess-who-database`.game_codes WHERE code_name = ?;";
        const gameCodesResult = await dbPromiseQuery(sql, [req.body.code1]);

        if (gameCodesResult.length === 0) {
            return res.json("Code not found");
        }

        let id_array = gameCodesResult[0].names.split(',');
        let card_array = [];
        let random = Math.floor(Math.random() * id_array.length)

        for (let id of id_array) {
            const sql2 = "SELECT * FROM `guess-who-database`.names WHERE id = ?;";
            const namesResult = await dbPromiseQuery(sql2, [id]);
            card_array.push({ name: namesResult[0].name, image: namesResult[0].image });
        }
        res.json([card_array, req.body.code1, card_array[random].name]);
    } catch (err) {
        console.error(err);
        res.json("Error");
    }
});

function dbPromiseQuery(sql, params) {
    return new Promise((resolve, reject) => {
        db.query(sql, params, (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
}


// tells app to listen to port 8081
app.listen(8081, ()=> {
    console.log("listening");
});
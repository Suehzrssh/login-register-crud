const express = require('express');
const app = express();
const mysql = require('mysql2');
const cors = require('cors');
const bcrypt = require('bcrypt');

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: '12345678',
    database: 'login-registration',
});

app.post('/register', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    db.query('INSERT INTO users (username, password) VALUES (?,?)',
         [username, password], (err, result) => {
            console.log(err);
         });
});

app.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    db.query('SELECT * FROM users WHERE username = ? AND password = ?',
         [username, password], (err, result) => {
            if(err) {
                res.json({err: err});
            }

            if(result.length > 0) {
                res.json(result)
            }else {
                res.json({message: 'Wrong username or password'});
            }
            
         });
})


app.listen(5000, () => {
    console.log('server is running on port 50000.....');
});
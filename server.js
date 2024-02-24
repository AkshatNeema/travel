const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');
const dotenv = require("dotenv");
// const fs = require("fs");

const app = express();
const port =  process.env.PORT;



// Database connectionF
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user:  process.env.DB_USER,
    password:  process.env.DB_PASSWORD,
    database:  process.env.DB_DATABASE
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to database: ' + err.stack);
        return;
    }
    console.log('Connected to database');
});

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve static files from 'public' directory
app.use(express.static(path.join(__dirname, 'views')));

// Set EJS as the view engine
app.set('view engine', 'ejs');

//Set env 
let dotenvPath = `${path.dirname(__dirname)}/.env`;
dotenv.config({
  silent: true,
  path: dotenvPath,
})


// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.post('/login', (req, res) => {
    const { userId, password } = req.body;
    if (!userId || !password) {
        return res.status(400).send('User ID and Password are required');
    }
    // Validate user credentials and handle login logic
    // Example:
    db.query('SELECT * FROM users WHERE userId = ? AND password = ?', [userId, password], (err, results) => {
        if (err) {
            return res.status(500).send('Internal Server Error');
        }
        if (results.length === 0) {
            return res.status(401).send('Invalid User ID or Password');
        }
        console.log('Login Sucessfull:',results)
        res.redirect('https://www.makemytrip.com/');
    });
});



// Handle form submission from signup page
app.post('/signup', (req, res) => {
    const { firstname, lastname, phone, email, password } = req.body;
    if (!firstname || !lastname || !phone || !password) {
        return res.status(400).send('All fields are required');
    }

// Generate unique user ID
    const uid = `${firstname.substring(0, 3).toLowerCase()}${phone.replace(/\D/g, '').slice(-3)}`;
    
// Construct userData object
    const userData = {
        userId:uid,
        firstname: firstname,
        lastname: lastname,
        phone: phone,
        email: email,
        password: password
    };

    // Insert user data into the database
    db.query('INSERT INTO users SET ?', userData, (error, results) => {
        if (error) {
            console.error('Error inserting user data:', error);
            return res.status(500).send('Internal Server Error');
        }
        console.log('User data inserted:', results);
        // res.redrirect('/welcome.html'); // Redirect to welcome page after successful signup
        res.render('welcome',{firstname:firstname, userId : uid});
    });
});


// app.get('/welcome', (req, res) => {
//     res.send('Welcome to our travel destination');
// });

// Handle GET request for welcome page
app.get('/welcome', (req, res) => {
    res.send('Welcome to our travel destination');
});

// Handle 404 Not Found
app.use((req, res, next) => {
    res.status(404).send("Sorry, can't find that!");
});

// Handle errors
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

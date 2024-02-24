const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'Akshat',
    password: '01@Rajasva',
    database: 'travel_website'
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to database');
});

module.exports = db;

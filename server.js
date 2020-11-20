const express = require('express');
const app = express();
const { pool } = require('./db');

const PORT = process.env.PORT || 4000;

app.set('views', './views');
app.set('view engine', 'ejs');

app.use(express.static('public'));

app.get('/', (req,res) => {
    res.render('home');
});

app.get('/user/login', (req,res) => {
    res.render('login');
});

app.get('/user/register', (req,res) => {
    res.render('register');
});

app.get('/user/dashboard', (req,res) => {
    res.render('dashboard', {user: 'Jack'});
});

app.listen(PORT, () => {
    console.log(`Server listening at: ${PORT}`)
});
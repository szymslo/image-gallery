const express = require('express');
const app = express();
const auth = require('./routes/auth')
const { pool } = require('./db');

const PORT = process.env.PORT || 4000;

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.use(express.urlencoded({ extended:false }));

app.use('/user', auth);

app.get('/', (req,res) => {
    res.render('home');
});

app.listen(PORT, () => {
    console.log(`Server listening at: ${PORT}`)
});
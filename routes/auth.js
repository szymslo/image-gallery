const router = require('express').Router();
const pool = require('../db');
const bcrypt = require('bcrypt');

const checkName = input => {
    const regex = new RegExp("^[a-zA-Z0-9]+$");

    if(!input || input.trim().length < 1) {
        throw 'Empty name!';
    }
    
    if(!regex.test(input)) {
        throw 'No special characters allowed!';
    }
}

const checkEmail = email => {
    const regex = new RegExp("^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$");

    if(regex.test(email)) {
        throw 'Wrong email';
    }
}

const checkPasswords = (password, conPassword) => {
    if(!password || password.trim().length < 1) {
        throw 'Empty password!';
    }
    if(password !== conPassword) {
        throw 'Passwords dont match!';
    }
}

router.get('/login', (req,res) => {
    res.render('login');
});

router.get('/register', (req,res) => {
    res.render('register');
});

router.get('/dashboard', (req,res) => {
    res.render('dashboard', {user: 'Jack'});
});

router.post('/register', async (req,res) => {
    let errors = [];

    try {
        const {name, email, password, conPassword, userType} = req.body;
        checkName(name);
        checkEmail(email);
        checkPasswords(password,conPassword);
        
        const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [email]);
        if(user.rows.length !== 0) {
            throw "Email already in use";
        }

    }
    catch (err) {
        errors.push(err)
    }

    if (errors.length > 0) {
        res.render('register', { errors })
    }
});

module.exports = router;
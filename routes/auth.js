const router = require('express').Router();
const pool = require('../db');
const bcrypt = require('bcrypt');
const passport = require('passport');
const { encode } = require('base64-arraybuffer');

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

router.get('/', checkNotAuth, (req,res) => {
    res.render('home');
});

router.get('/login', checkNotAuth, (req,res) => {
    res.render('login');
});

router.get('/logout', checkAuth, (req,res) => {
    req.logOut();
    req.flash('success_msg', 'You have logged out');
    res.redirect('/');
});

router.get('/register', checkNotAuth, (req,res) => {
    res.render('register');
});

router.get('/dashboard', checkAuth, async (req,res) => {

    const uid = req.user.user_id;
    let gallery = [];

    try {
        const images = await pool.query("SELECT image_name, image_data FROM images WHERE user_id = $1", [uid]);
        if(images.rows.length === 0) {
            images = false;
            throw 'No images :('
        }

        for(let i=0; i<images.rows.length; i++) {
            gallery.push(encode(images.rows[i].image_data));
        }

        res.render('dashboard', {name: req.user.user_name, role: req.user.user_type, content: gallery});
    }
    catch(err) {
        res.render('dashboard', {name: req.user.user_name, role: req.user.user_type});
    }
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

        const hashedPassword = await bcrypt.hash(password,10);

        await pool.query(
            `INSERT INTO users (user_name, user_email, user_password, user_type) 
            VALUES ($1, $2, $3, $4)
            RETURNING user_id, user_password`, [name, email, hashedPassword, userType])

        req.flash('succes_msg', 'User succesfully registered');
        res.redirect('login');
    }
    catch (err) {
        errors.push(err)
    }

    if (errors.length > 0) {
        res.render('register', { errors })
    }
});

router.post(
    '/login',
    passport.authenticate('local', {
        successRedirect: 'dashboard',
        failureRedirect: 'login',
        failureFlash: true
    })
);

router.post('/upload', async (req,res) => {
    if(!req.files) {
        return res.status(400).send('No file uploaded');
    }
    const { email } = req.body;
    const image = req.files.img;

    try {
        const findUser = await pool.query("SELECT user_id FROM users WHERE user_email = $1", [email])
        if(findUser.rows.length === 0) {
            throw 'No user with that email';
        }

        uid = findUser.rows[0].user_id;

        await pool.query(
            `INSERT INTO images (image_name, image_data, user_id) 
            VALUES ($1, $2, $3)`, [image.name, image.data, uid]);
    
        req.flash('succes_msg', 'Image succesfully uploaded');
        res.redirect('dashboard');
    }
    catch(err) {
        return res.status(400).send("Database error: " + err)
    } 
})

function checkAuth (req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    res.redirect('login')

}

function checkNotAuth (req, res, next) {
    if(req.isAuthenticated()) {
        return res.redirect('dashboard')
    }
    next();

}

module.exports = router;
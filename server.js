const express = require('express');
const app = express();
const auth = require('./routes/auth')
const session = require('express-session');
const flash = require('express-flash');
const passport = require('passport');
const initializePassport = require('./passport-config')
const fileUpload = require('express-fileupload');

initializePassport(passport);

const PORT = process.env.PORT || 4000;

app.set('view engine', 'ejs');

app.use(fileUpload());

app.use(express.static('public'));
app.use(express.urlencoded({ extended:false }));

app.use(flash());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize());
app.use(passport.session());

app.use('/', auth);

app.listen(PORT, () => {
    console.log(`Server listening at: ${PORT}`)
});
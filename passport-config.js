const LocalStrategy = require('passport-local').Strategy;
const pool = require('./db');
const bcrypt = require('bcrypt');

function initializePassport(passport) {

    const authenticateUser = async (email, password, done) => {
        const checkUser = await pool.query("SELECT * FROM users WHERE user_email = $1", [email]);
        if(checkUser.rows.length > 0) {
            const user = checkUser.rows[0];

            try {
                if (await bcrypt.compare(password, user.user_password)) {
                    return done(null, user);
                }
                else {
                    return done(null, false, {message : 'Password incorect!'})
                }
            }
            catch (err) {
                return done(err)
            }
        }
        else {
            return done(null, false, {message: 'No user found!'})
        }
    }

    passport.use(new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password'
        },
        authenticateUser
    ));

    passport.serializeUser((user, done) => done(null, user.user_id));

    passport.deserializeUser(async (id, done) => {
        const currentUser = await pool.query("SELECT * FROM users WHERE user_id = $1", [id]);
        return done(null, currentUser.rows[0]);
    });
};

module.exports = initializePassport;
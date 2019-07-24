const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const { User } = require('../models');

module.exports = (passport) => {

    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',

    }, async (email, password, done) => {
        try {
            const exUser = await User.findOne({ where: { email } });
            if (exUser) {
                const result = await bcrypt.compare(password, exUser.password);
                if (result) {
                    done(null, exUser);
                } else {
                    done(null, false, { message: 'The password is not correct.' });
                }
            } else {
                done(null, false, { message: 'The Username is not found.' });
            }
        } catch (error) {
            console.error(error);
            done(error);
        }
    }));
};
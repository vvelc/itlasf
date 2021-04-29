const passport = require('passport');
const localStrategy = require('passport-local').Strategy;

const User = require('../models/user')

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null, user)
})

passport.use('local-signup', new localStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: 'true',
}, async (req, email, password, done) => {
    
    //const user = (await User.findOne({email: email})).$isEmpty;
    //console.log(user)
    
    const user = await User.exists({email: email}, function (err, doc) {
        if (err){
            console.log(err)
        } else {
            if(doc) {
                return done(null, false, req.flash('signupMessage', 'Este correo ya ha sido tomado.'));
            }
            else {
                const newUser = new User();
                newUser.name = req.body.name;
                newUser.lastname = req.body.lastname;
                newUser.email = email;
                newUser.date = req.body.date;
                newUser.password = newUser.encryptPassword(password);
                newUser.province = req.body.province;
                newUser.career = req.body.career;
                newUser.verifycode = newUser.createVerifyCode(email);
                newUser.save();
                done(null, newUser);
            }
        }
    });
}));

passport.use('local-signin', new localStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: 'true'
}, async (req, email, password, done) => {
    const user = await User.findOne({email: email});
    if(!user) {
        return done(null, false, req.flash('signinMessage', 'Este usuario no existe.'))
    }
    if(!user.comparePassword(password)) {
        return done(null, false, req.flash('signinMessage', 'Contraseña incorrecta.'))
    }
    done(null, user)
}));
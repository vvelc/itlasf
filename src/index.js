const express = require('express');
const engine = require('ejs-mate');
const path = require('path');
const morgan = require('morgan');
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');
const User = require('./models/user');
const Entry = require('./models/entry');

// initializations
const app = express();
require('./database')
require('./passport/local-auth');

//cookies

const cookieParser = require('cookie-parser');

app.use(cookieParser());

// settings
app.set('views', path.join(__dirname, 'views'))
app.engine('ejs', engine)
app.set('view engine', 'ejs')
app.set('port', process.env.PORT || 3000)

// middlewares
app.use(express.static(__dirname + '/public')); // Establecer carpeta public
app.use(morgan('dev')); // Ver requests
app.use(express.urlencoded({extended: false})) // Configurar express
app.use(session({   // Configurar session
    secret: 'mysecretsession',
    resave: false,
    saveUninitialized: true // Estaba en false. Cambiar en caso de error
}))
app.use(flash()) // Configurar flash
app.use(passport.initialize())
app.use(passport.session())

app.use(async (req, res, next) => {
    app.locals.signupMessage = req.flash('signupMessage')
    app.locals.signinMessage = req.flash('signinMessage')
    app.locals.user = req.user;
    app.locals.users = await User.find({},);
    app.locals.entries = await Entry.find({},).sort({likes:-1})
    app.locals.nentries = await Entry.find({},).sort({_id:-1})
    next();
})

// routes

app.use('/', require('./routes/index'))

// starting server

app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'))
})
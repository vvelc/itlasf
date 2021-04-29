const express = require('express');
const router = express.Router();
const passport = require('passport')
const User = require('../models/user')
const Entry = require('../models/entry')
const nodemailer = require("nodemailer")
const fs = require('fs');

// index

router.get('/', isAuthenticated, async (req, res, next) => {
    let nav = null
    let crear = true
    if (req.user.verified) {
        res.render('index', {
            nav, crear
        }) 
    }
    else {
        res.redirect('/verify')
    }
     
})

// Get de la ruta verify para decirle al usuario que no se ha verificado

router.get('/verify', isAuthenticated, async (req, res, next) => {
    let nav = "logo"
    let enviado = false
    let crear = fal
    res.render('verify', {
        nav, crear, enviado
    })
})

// Post de la ruta verify para enviar correo de verificacion

router.post('/verify', isAuthenticated, async (req, res, next) => {
    "use strict";
    const nodemailer = require("nodemailer");

    // async..await is not allowed in global scope, must use a wrapper
    async function main() {

        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
                user: "itlastudentforum@gmail.com", 
                pass: "qegyyyruvewgkobh"
            },
        });

        // send mail with defined transport object

        let info = await transporter.sendMail({
            from: '"ITLA SF" <itlastudentforum@gmail.com>', // sender address
            to: `${req.user.email}`, // list of receivers
            subject: "Verificación de cuenta", // Subject line
            text: `
            Gracias por registrarte en ITLA SF.
            
            Para completar tu proceso de registro, haz click el en siguiente enlace: http://10.0.0.100:3000/verify/${req.user.verifycode}
            `, // plain text body
            html: `
            <h2> Verifiación de cuenta</h2>
            <p>
                Gracias por registrarte en ITLA SF.
                Para completar tu proceso de registro, haz click el en siguiente enlace:
            </p>
            <a href="http://10.0.0.100:3000/verify/${req.user.verifycode}" 
            style="display:block; padding:20px; color:white; background-color:#333333; border-radius: 50px
            text-align: center;">
                Verificar tu cuenta
            </a>
            `, // html body
        });

        console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

        // Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
        }

    main().catch(console.error);

    let nav = "logo"
    let enviado = true
    let crear = false
    res.render('verify', {
        nav, crear, enviado
    })
})

//  Get de la ruta verify:id para verificar un usuario por su codigo de verificacion

router.get('/verify/:id', async (req, res, next) => {
    let nav = "logo"
    let crear = false
    const usertoverify = await User.exists({verifycode: req.params.id}, async function (err, doc) {
        if (err) {
            const error = true
            res.render('verified', {
                nav, error, crear, usertoverify
            })
        }
        else {
            if(doc) {
                const user = await User.findOne({verifycode: req.params.id})
                const verified = await user.updateOne({
                    verified: true
                })
                const error = false
                res.render('verified', {
                    nav, error, crear, user
                })
            }
        }
    })
})

// Get de la ruta sign para mostrar pantalla de inicio de sesion y registro

router.get('/sign', (req, res, next) => {
    let nav = "logo"
    let crear = false
    res.render('sign', {
        nav, crear
    })
})


// Post de la ruta register para registrar usuario

router.post('/register', passport.authenticate('local-signup', {
    successRedirect: '/verify',
    failureRedirect: '/sign#register',
    passReqToCallback: true
}))

// Post de la ruta login para autenticar usuario

router.post('/login', passport.authenticate('local-signin', {
    successRedirect: '/',
    failureRedirect: '/sign',
    passReqToCallback: true
}))

// Get de la ruta logout para cerrar sesión

router.get('/logout', (req, res, next) => {
    req.logout();
    res.redirect('/')
})

// Autoenticar todas las rutas. Comentar esta sección para deshabilitarlo
// y autenticar rutas manualmente

router.use((req, res, next) => {
    isAuthenticated(req, res, next);
    next;
})

// Get de la ruta profile:id para mostrar perfil de otro usuario

router.get('/profile/:id', async (req, res, next) => {

    // Si el perfil al que desea acceder es el suyo, redirigir a su perfil
    if (req.user._id == req.params.id) {
        res.redirect('/profile')
    }
    // De lo contrario, acceder al perfil del usuario en cuestión
    else {
        const usr = await User.findById(req.params.id)
        let nav = "goback"
        let crear = true
        res.render('oprofile', {
            usr, nav, crear
        })
    }
});

// Get de la ruta profile para mostrar perfil propio

router.get('/profile', isAuthenticated, (req, res, next) => {
    let nav = "goback"
    let crear = true
    res.render('profile', {
        nav, crear
    })
});

// Get de la ruta newentry para mostrar pagina de crear nueva entrada

router.get('/newentry', isAuthenticated, (req, res, next) => {
    let nav = "goback"
    let crear = false
    res.render('newentry', {
        nav, crear
    })
})

// Post de la ruta newentry para pubilicar nueva entrada

router.post('/newentry', (req, res, next) => {
    
    const newEntry = new Entry();
    newEntry.title = req.body.title;
    newEntry.content = req.body.content;
    newEntry.category = req.body.category;
    newEntry.date = req.body.date;
    newEntry.author = req.body.author;

    console.log(newEntry)

    newEntry.save()
    res.redirect('/')
})

// Get de la ruta delentry para mostrar pagina de confirmacion de eliminacion

router.get('/delentry/:id', async (req, res, next) => {
    const ent = await Entry.findById(req.params.id)
    let nav = "goback"
    let crear = false
    res.render('delentry', {
        ent, crear
    })
})

// Post de la ruta delentry, para eliminar entradas

router.post('/delentry/:id', async (req, res, next) => {
    const entry = await Entry.findByIdAndDelete(req.params.id)
    res.redirect('/')
})

// Post de la ruta delcomment para eliminar comentario

router.post('/delcomment/:id/:cid', async (req, res, next) => {
    const entry = await Entry.findById(req.params.id)
    const comment = await entry.comments.findByIdAndDelete(req.params.cid)
    res.redirect('/entry/' + req.params.id)
})

// Post de la ruta likecomment para dar me gusta a un comentario

router.post('/likecomment/:id/:cid', async (req, res, next) => {
    const entry = await Entry.findById(req.params.id)
    const comment = await entry.comments.findById(req.params.cid)
    const clike = await comment.update({
        likes: comment.likes + 1
    })
    const elike = await entry.update({
        likes: entry.likes + 1
    })
    res.redirect('/entry/' + req.params.id)
})

// Post de la ruta dislikecomment para dar me gusta a un comentario

router.post('/dislikecomment/:id/:cid', async (req, res, next) => {
    const entry = await Entry.findById(req.params.id)
    const comment = await entry.comments.findById(req.params.cid)
    const cdislike = await comment.update({
        dislikes: comment.likes + 1
    })
    const edislike = await entry.update({
        dislikes: entry.likes + 1
    })
    res.redirect('/entry/' + req.params.id)
})

// Get de la ruta entry, para ver entradas existentes

router.get('/entry/:id', async (req, res, next) => {
    const ent = await Entry.findById(req.params.id)
    const coms = ent.comments
    let nav = "goback"
    let crear = true
    res.render('entry', {
        ent, coms, nav, crear
    })
})

// Post de la ruta entry, para hacer comentarios

router.post('/entry/:id', async (req, res, next) => {
    const entry = await Entry.findById(req.params.id)
    entry.comments.push({
        content: req.body.comment,
        date: req.body.comdate,
        author: req.body.comauthor
    })
    entry.save(/*(err, com) => { console.log('New comment saved!'); }*/)
    res.redirect('/entry/' + req.params.id)
})

// Post de la ruta report, para reportar una entrada

router.post('/report/:id/:type', async (req, res, next) => {
    res.render('report')
})

// función que pide autenticación antes de ingresar (opcional)

function isAuthenticated(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    res.redirect('/sign')
}

module.exports = router
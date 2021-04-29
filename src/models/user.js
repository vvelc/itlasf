const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs')
const { Schema } = mongoose;

const userSchema = new Schema({
    name: String,
    lastname: String,
    email: String,
    password: String,
    province: String,
    career: String,
    image: { type: String, default: ''},
    range: { type: String, default: 'NOVATO'},
    posts: Number,
    comments: Number,
    likes: Number,
    //date: { type: Date, default: Date.now() },
    date: String,
    interests: {
        interest1: { type: String, default: '' },
        interest2: { type: String, default: '' },
        interest3: { type: String, default: '' }
    },
    hobbies: {
        hobbie1: { type: String, default: '' },
        hobbie2: { type: String, default: '' }
    },
    verified: {
        type: Boolean, default: false
    },
    verifycode: String
})

userSchema.methods.encryptPassword = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

userSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password)
}

userSchema.methods.createVerifyCode = (plaincode) => {
    return bcrypt.hashSync(plaincode, bcrypt.genSaltSync(10))
}

module.exports = mongoose.model('users', userSchema);
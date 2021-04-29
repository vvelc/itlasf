const mongoose = require('mongoose');
const { Schema } = mongoose;

const commentSchema = new Schema ({
    author: String,
    content: String,
    date: String,
    likes: Number,
    dislikes: Number
})

const entrySchema = new Schema({
    title: String,
    content: String,
    category: String,
    date: String,
    author: String,
    comments: { type: [commentSchema] },
    qcomments: Number,
    likes: Number
});

module.exports = mongoose.model('entries', entrySchema);
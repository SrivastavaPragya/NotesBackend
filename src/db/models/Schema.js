const mongoose = require('mongoose');


// Schema for notes
const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    required:true
   
});



// Schema for users
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    }
});

const Note = mongoose.model('Note', noteSchema);
const User = mongoose.model('User', userSchema);

module.exports = { Note, User };

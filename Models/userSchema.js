const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    username:{
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password:{
        type: String,
        require: true
    },
    noteTitle:{
        type: String
    },
    notePdf:{
        type: String
    },
    courseName:{
        type: String
    },
    subjectName:{
        type: String
    },
    paypalEmail:{
        type: String
    },
    profile:{
        type: String
    }


})

const users = mongoose.model("users",userSchema)
module.exports = users;

const mongoose = require('mongoose')

const noteSchema = new mongoose. Schema({
    noteTitle:{
        type: String,
        require: true
    },
    notePdf: {
        type: String,
        require: true
    },
    courseName: {
        type: String,
        require: true
    },
    subjectName:{
        type: String,
        require: true 
    },
    paypalEmail: {
        type: String,
        require: true
    },
    noteDescription: {
        type: String,
        require: true
    },
    noteThumbnail: {
        type: String,
        require: true
    },
    userId: {
        type: String,
        require: true
    }

})

const notes = mongoose.model("notes",noteSchema)

module.exports = notes;
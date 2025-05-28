const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  universityName: {
    type: String,
    required: true
  },
  courseName: {
    type: String,
    required: true
  },
  syllabus: {
    type: String,
    required: true
  },
  collegeName: {
    type: String,
    required: true
  },
  profileImage: {
    type: String,
    required: true
  },
  paypalEmail: {                // <-- Added field here
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true           // fixed typo here: changed 'require' to 'required'
  }
});

const profiles = mongoose.model("profiles", ProfileSchema);
module.exports = profiles;

const notes = require('../Models/noteSchema');

exports.addNote = async (req, res) => {
    console.log("Inside addNoteController")
    const userId = req.payload;
    console.log(userId)
    const noteThumbnail = req.files['noteThumbnail'][0].filename;
    console.log(noteThumbnail)
    const notePdf = req.files['notePdf'][0].filename;
    console.log(notePdf)
    const { noteTitle, courseName, subjectName, noteDescription } = req.body; // paypalEmail removed
    try {
        const existingNote = await notes.findOne({ notePdf: notePdf });
        if (existingNote) {
            res.status(406).json("Note already exists, please upload a new one.");
        } else {
            const newNote = new notes({
                noteTitle: noteTitle,
                notePdf: notePdf,
                courseName: courseName,
                subjectName: subjectName,
                noteDescription: noteDescription,
                noteThumbnail: noteThumbnail,
                userId: userId
            });
            await newNote.save();
            res.status(200).json("Note added successfully.");
        }
    } catch (err) {
        res.status(401).json("Unable to add note due to: " + err);
    }
}

exports.getHomeNote = async (req, res) => {
    try {
        const homeNote = await notes.find().limit(3);
        res.status(200).json(homeNote)
    }
    catch (err) {
        res.status(401).json("Request failed due to ", err)
    }
}

exports.getAllNote = async (req, res) => {
    const searchKey = req.query.search
    console.log(searchKey)

    const query = {
        noteTitle: {
            $regex: searchKey, $options: 'i'
        }
    }

    try {
        const allNote = await notes.find(query);
        res.status(200).json(allNote)
    } catch (err) {
        res.status(401).json("Request failed due to ", err)
    }
}

exports.getUserNote = async (req, res) => {
    const userId = req.payload
    try {
        const userNote = await notes.find({ userId: userId })
        res.status(200).json(userNote)
    } catch (err) {
        res.status(401).json("Request failed due to ", err)
    }
}

exports.editUserNote = async (req, res) => {
    const { id } = req.params;
    const userId = req.payload;
    console.log("note id", id)
    console.log("user id", userId)
    const { noteTitle, courseName, subjectName, noteDescription, noteThumbnail } = req.body; // paypalEmail removed
    const uploadNoteThumbnail = req.file ? req.file.filename : noteThumbnail;
    try {
        const updateNote = await notes.findByIdAndUpdate(
            { _id: id }, {
            noteTitle: noteTitle,
            subjectName: subjectName,
            courseName: courseName,
            noteDescription: noteDescription,
            noteThumbnail: uploadNoteThumbnail,
            userId: userId
        },
            { new: true }
        )
        await updateNote.save()
        res.status(200).json("Note updated successfully")
    } catch (err) {
        res.status(401).json("Unable to update due to:", err)
    }
} 

exports.deleteUserNote = async (req, res) => {
    const { id } = req.params
    try {
        const removeNote = await notes.findByIdAndDelete({ _id: id })
        res.status(200).json("Note deleted successfully")
    } catch (err) {
        res.status(401).json("delete failed", err)
    }                       
}

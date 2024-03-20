exports.addNote = async (req, res) => {
    console.log("Inside addNoteController")
    const userId = req.payload;
    console.log(userId)
    const noteThumbnail = req.file.filename;
    console.log(noteThumbnail)

}
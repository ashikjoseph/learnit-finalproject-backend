const profiles = require('../Models/profileSchema'); 

exports.addProfile = async (req, res) => {
    try {
        const userId = req.payload;
        console.log(userId);
        const { universityName, courseName, syllabus, collegeName} = req.body; 
        const profileImage = req.file ? req.file.filename : null;

        try {
            const existingProfile = await profiles.findOne({ userId:userId });
            if (existingProfile) {
                return res.status(406).json("profile already updated");
            } else {
                const newProfile = new profiles({
                    universityName,
                    courseName,
                    syllabus,
                    collegeName,
                    profileImage,
                    userId
                });
                await newProfile.save();
                return res.status(200).json("Profile added successfully.");
            }
        } catch (err) {
            return res.status(401).json("Unable to add data due to: " + err);
        }
    } catch (err) {
        return res.status(500).json("Server error: " + err);
    }
};



// get user profile

exports.getUserProfile = async (req, res) => {
    const userId = req.payload
    try {
        const userProfile = await profiles.find({ userId: userId })
        res.status(200).json(userProfile)
    } catch (err) {
        res.status(401).json("Request failed due to ", err)
    }
}


exports.editUserProfile = async (req, res) => {
    const { id } = req.params;
    const userId = req.payload;
    console.log("note id", id)
    console.log("user id", userId)
    const { universityName,courseName,syllabus,collegeName,profileImage } = req.body;
    const uploadProfileImage = req.file ? req.file.filename : profileImage;
    try {
        const updateProfile = await profiles.findByIdAndUpdate(
            { _id: id }, {
            universityName,
            courseName,
            syllabus,
            collegeName,
            profileImage:uploadProfileImage,
            userId: userId
        },
            { new: true }
        )
        await updateProfile.save()
        res.status(200).json("Profile updated successfully")
    } catch (err) {
        res.status(401).json("Unable to update due to:", err)
    }
} 
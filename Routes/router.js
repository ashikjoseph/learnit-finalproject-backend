// path to resolve each client request
const userController= require('../Controllers/userController')
const noteController = require('../Controllers/noteController')
const profileController= require('../Controllers/profileController')
const jwtMiddleware = require('../Middlewares/jwtMiddleware')
const multerConfig = require('../Middlewares/multerMiddleware')

//1) import express
const express = require("express")

// 2) create an object for the class Router in Express
const router = new express.Router();

//3) define paths

// 1) user registration
router.post('/user/register', userController.register)

// 2) user login
router.post('/user/login',userController.login)

// 3) add new note

router.post('/note/add', jwtMiddleware, multerConfig.fields([
    { name: 'noteThumbnail', maxCount: 1 },
    { name: 'notePdf', maxCount: 1 }
]), noteController.addNote);

// 4)get note for home page
router.get('/note/home-note',noteController.getHomeNote)

// 5) get all projects
router.get('/note/all-note',jwtMiddleware,noteController.getAllNote)

// 6)get user projects
router.get('/note/user-note',jwtMiddleware,noteController.getUserNote)


// 7) edit user note
router.put('/note/edit/:id',jwtMiddleware,multerConfig.single("noteThumbnail"),noteController.editUserNote)

// 8)delete user note
router.delete('/note/remove/:id',jwtMiddleware,noteController.deleteUserNote)


// 9)add profile
router.post('/profile/add',jwtMiddleware, multerConfig.single('profileImage'), profileController.addProfile);

// 10)get user profile
router.get('/user-profile',jwtMiddleware,profileController.getUserProfile)

// 11) edit user profile
router.put('/edit-profile/:id',jwtMiddleware,multerConfig.single("profileImage"),profileController.editUserProfile)


// 4) export router
module.exports= router;
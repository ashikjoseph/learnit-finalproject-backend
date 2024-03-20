// path to resolve each client request
const userController= require('../Controllers/userController')
const noteController = require('../Controllers/noteController')
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
router.post('/note/add',jwtMiddleware,multerConfig.multiple('noteThumbnail', 'notePdf'),noteController.addNote)









// 4) export router
module.exports= router;
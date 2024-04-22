const express = require('express')
const userController = require('./Controllers/usercontroller')
const router = new express.Router()
const projectController = require('./Controllers/projectController')
const jwtMiddleware = require('./Middlewares/jwtMiddleware')
const multerConfig = require('./Middlewares/multerMiddleware')

//register
router.post('/register',userController.register)
//login
router.post('/login',userController.login)

//add project route
router.post('/add-project',jwtMiddleware,multerConfig.single('projectImage'),projectController.addProject)

//get all projects
router.get('/all-projects',jwtMiddleware,projectController.getAllProjects)

//get userprojects
router.get('/user-projects',jwtMiddleware,projectController.getUserProjects)

//get home projects
router.get('/home-projects',projectController.getHomeProjects)

//edit project
router.put('/edit-project/:pid',jwtMiddleware,multerConfig.single('projectImage'),projectController.editProject)

//remove project
router.delete('/remove-project/:pid',jwtMiddleware,projectController.removeProject)

//edituser
router.put(`/edit-user`,jwtMiddleware,multerConfig.single("profileImage"),userController.editUser)

//export router
module.exports = router
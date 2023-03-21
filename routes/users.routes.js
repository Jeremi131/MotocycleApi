const express = require('express')

const userController = require('../controllers/users.controller')

const router = express.Router()



router
    .route('/')
    .get(userController.findAllUsers)
    .post(userController.createUser);

router
    .route('/:id')
    .get(userController.findAllUsers)
    .patch(userController.updateUser)
    .delete(userController.deleteUser);

    module.exports = router
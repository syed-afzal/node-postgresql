const router = require('express').Router();
const {verifyToken} = require('../middlewares/jwt.middleware');

const usersController = require('../controllers/users.controller');

router.post('/login', usersController.login);

router.get('/searchUSer',  usersController.searchUser);

router.get('/getUsersWithPermissions', usersController.getUsersWithPermissions);

router.get('/me', verifyToken, usersController.getUser);

router.post('/', usersController.createUser);

// router.post('/assignPermissionToRole', usersController.);

router.delete('/:id', usersController.deleteUser);

module.exports = router;

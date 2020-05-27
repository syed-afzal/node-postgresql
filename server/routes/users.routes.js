const router = require('express').Router();

const usersController = require('../controllers/users.controller');

router.post('/login', usersController.login)

router.get('/',  usersController.getUser);

router.get('/getUsersWithPermissions', usersController.getUsersWithPermissions);

router.get('/:id', usersController.getUserById);

router.post('/', usersController.createUser);

// router.post('/assignPermissionToRole', usersController.);

router.delete('/:id', usersController.deleteUser);

module.exports = router;

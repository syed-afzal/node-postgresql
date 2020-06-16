const router = require('express').Router();
const {verifyToken} = require('../middlewares/jwt.middleware');
const {verifyRole} = require('../middlewares/role.middleware');

const usersController = require('../controllers/users.controller');

router.post('/login', usersController.login);

router.get('/searchUSer', verifyToken, verifyRole('ADMIN', 'EMPLOYEE'), usersController.searchUser);

router.get('/getUsersWithPermissions', verifyToken, usersController.getUsersWithPermissions);

router.get('/me', verifyToken, usersController.getUser);

router.post('/', verifyToken, verifyRole('SUPER ADMIN', 'ADMIN'), usersController.createUser);

// router.post('/assignUserRole', usersController.);
// router.post('/assignPermissionRole', usersController.);

router.delete('/:id', usersController.deleteUser);

module.exports = router;

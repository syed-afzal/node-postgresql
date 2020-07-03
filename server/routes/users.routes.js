const router = require('express').Router();
const {verifyToken} = require('../middlewares/jwt.middleware');
const {verifyRole} = require('../middlewares/role.middleware');
const {wrap} = require('../helpers/request.utilties');

const usersController = require('../controllers/users.controller');

router.post('/login', usersController.login);

router.get('/getUsersWithPermissions', verifyToken, verifyRole('SUPER ADMIN', 'ADMIN', 'EMPLOYEE'),  wrap(usersController.getUsersWithPermissions));

router.get('/me', verifyToken, wrap(usersController.getUser));

router.post('/', verifyToken, verifyRole('SUPER ADMIN', 'ADMIN'), wrap(usersController.createUser));

router.put('/assignUserRole', verifyToken, verifyRole('SUPER ADMIN', 'ADMIN'), wrap(usersController.assignRole));

router.put('/assignPermissionsToRole', verifyToken, verifyRole('SUPER ADMIN', 'ADMIN'), wrap(usersController.assignPermissionsToRole));

router.delete('/:id', wrap(usersController.deleteUser));

module.exports = router;

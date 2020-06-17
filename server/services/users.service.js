const userRepository = require('../repositories/users.repository');
const messages = require('../config/server.messages');
const bcrypt = require('bcrypt');
const {createToken} = require('../middlewares/jwt.middleware');
const Roles = require('../models').Roles;
const Permissions = require('../models').Permissions;

const userProjection =  {
    //raw: true, // just return dataValues not whole object link https://stackoverflow.com/questions/46380563/get-only-datavalues-from-sequelize-orm
    include:[{
        model: Roles,
        as: 'userRole',
        attributes: {exclude: ['createdAt','updatedAt', 'role_id']},
        include: [{
            model: Permissions,
            as: 'userPermissions',
            attributes: {exclude: ['createdAt','updatedAt']}
        }]
    }],
    attributes: {exclude: ['createdAt','updatedAt', 'role_id']}
};

const usersService = {};

usersService.login = async (data = {}) => {
    try {
        let user = await userRepository.findOne({
            ...userProjection,
            where: { email: data.email },
            });
        if (!user) return {message: messages.USER_NOT_EXISt, user:null};

        user = user.get();

        // check the password
        const password_check = await bcrypt.compareSync(data.password, user.password);
        if(!password_check) return {message: messages.AUTHENTICATION_FAILED, user:null};

        // generate jwt token
        user.token = createToken(user, 86400);

        delete user.password;

        return {message: messages.SUCCESSFUL, user};
    } catch (e) {
        throw new Error(e);
    }
};

usersService.searchUser = async (options = {}) => {
    return await userRepository.findAll(options);
};

usersService.getUser = async (id) => {
    return await userRepository.findOne({
        ...userProjection,
        where: {
            id
        }
    });

};

usersService.findAllUsersWithPermissions = async (role) => {
    const options = {
        attributes:['name']
    };
    if (role === 'SUPER ADMIN') {
        options.include = [{
            model: Roles,
            as: 'userRole',
            attributes: ['name'],
            include: [{
                model: Permissions,
                as: 'userPermissions',
                attributes: ['name']
            }]
        }]
    } else if (role === 'ADMIN') {
        options.include = [{
            model: Roles,
            as: 'userRole',
            attributes: ['name'],
        }]
    }
    return await userRepository.findAllUsersWithPermissions(options);
};

usersService.createUser = async (user = {}) => {
    user.password = await bcrypt.hash(user.password, 10);
    return await userRepository.insert(user)
};

usersService.assignRole = async (data = {}) => {
  return await userRepository.assignRole(data)
};

usersService.assignPermissionsToRole = async (data = {}) => {
    return await userRepository.assignPermissionsToRole(data);
}

usersService.updateUser = async (user = {}) => {

};

usersService.deletUserbyId = async (id) => {

};

module.exports = usersService;

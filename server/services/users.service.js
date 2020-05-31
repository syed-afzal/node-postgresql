const userRepository = require('../repositories/users.repository');
const messages = require('../config/server.messages');
const bcrypt = require('bcrypt');
const {createToken} = require('../middlewares/jwt.middleware');
const Roles = require('../models').Roles;

const userProjection =  {
    raw: true, // just return dataValues not whole object link https://stackoverflow.com/questions/46380563/get-only-datavalues-from-sequelize-orm
    include:[{
        model: Roles,
        as: 'userRole',
        attributes: {exclude: ['createdAt','updatedAt']}
    }],
    attributes: {exclude: ['createdAt','updatedAt', 'role_id']}
};

const usersService = {};

usersService.login = async (data = {}) => {
    try {
        const user = await userRepository.findOne({
            ...userProjection,
            where: { email: data.email },
            });
        if (!user) return {message: messages.USER_NOT_EXISt, user:null};

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

usersService.findAllUsersWithPermissions = async () => {
    res.status(200).send(await userRepository.findAllUsersWithPermissions());
};

usersService.createUser = async (user = {}) => {
    return await userRepository.insert(user)
};

usersService.updateUser = async (user = {}) => {

};

usersService.deletUserbyId = async (id) => {

};

module.exports = usersService;

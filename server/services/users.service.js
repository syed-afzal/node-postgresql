const userRepository = require('../repositories/users.repository');
const messages = require('../config/server.messages');
const bcrypt = require('bcrypt');
const {createToken} = require('../middlewares/jwt.middleware');

const usersService = {};

usersService.login = async (data = {}) => {
    try {
        const user = await userRepository.findOne({
            raw: true, // just return dataValues not whole object link https://stackoverflow.com/questions/46380563/get-only-datavalues-from-sequelize-orm
            where: { email: data.email },
            attributes: {exclude: ['createdAt','updatedAt']}
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

usersService.getUser = async (options = {}) => {
    return await userRepository.findAll(options);
};

usersService.getUserById = async (searchBy = {}) => {
    return await userRepository.find(searchBy);

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

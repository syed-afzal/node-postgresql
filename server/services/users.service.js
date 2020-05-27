const userRepository = require('../repositories/users.repository');
const messages = require('../config/server.messages');
const bcrypt = require('bcrypt');
const {createToken} = require('../middlewares/jwt.middleware');

const usersService = {};

usersService.login = async (data = {}) => {
    try {
        const user = await userRepository.findOne({ where: { email: data.email }, include:[{model: role}] });
        if (!user) return {message: messages.USER_NOT_EXISt, user:null};

        // check the password
        const password_check = await bcrypt.compareSync(data.password, user.password);
        if(!password_check) return {message: messages.AUTHENTICATION_FAILED, user:null};

        // generate jwt token
        usersService.token = createToken(user, 86400);

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

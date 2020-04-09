const userRepository = require('../repositories/users.repository');

const usersService = {};

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

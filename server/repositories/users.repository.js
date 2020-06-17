const Users = require('../models').Users;
const dbContext = require('../config/db.context');
const bcrypt = require('bcrypt');

const usersRepository = {};

usersRepository.findOne = async (options) => {
    return await Users.findOne(options);
};

usersRepository.findAll = async (options) => {
    return await Users.findAll(options);
};

usersRepository.find = async (searchBy = {}) => {
    return await Users.findAll({where: searchBy});
};

usersRepository.findAllUsersWithPermissions = async (options) => {
    let users = await Users.findAll(options);
    users =  JSON.parse(JSON.stringify(users));
    return users.map(user  => (
        {
            name: user.name,
            role: user.userRole.name,
            pemissions: user.userRole.userPermissions
        }
    ));
};

usersRepository.insert  = async (user) => {
    return await dbContext
        .query('CALL create_user (:name, :role_id, :gender, :dob, :imageUrl, :email, :password)',
            {
                replacements: {
                    name: user.name,
                    role_id: user.role_id ? user.role_id : null,
                    gender: user.gender,
                    dob: user.dob,
                    imageUrl: user.imageUrl ? user.imageUrl : null,
                    email: user.email,
                    password: user.password
                }
            });
};

usersRepository.assignRole = async (data) => {
    return await dbContext
        .query('CALL assign_role_to_user (:role_id, :role_name, :user_id)',
            {
                replacements: {
                    role_id: data.role_id,
                    role_name: data.role_name,
                    user_id: data.user_id,
                }
            });
};

usersRepository.assignPermissionsToRole = async (data) => {
    return await dbContext
        .query('CALL assign_permissions_to_role (:permission_id, ARRAY[:permissions], :role_id)',
            {
                replacements: {
                    permission_id: data.permission_id,
                    permissions: data.permissions,
                    role_id: data.role_id,
                }
            });
};

module.exports = usersRepository;

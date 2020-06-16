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

usersRepository.findAllUsersWithPermissions = async (req, res) => {
    const user = await Users.findAll({
        attributes:['name'],
        where: {id:1},
        include:[{model: role}],
    }).map(el => el.get({ plain: true }));

    const pemissions = await Role_to_Permissions.findAll({
        where:{role_id:user[0].role.id},
        include:[{model: permissions}]
    }).map(el => el.get({ plain: true }));

    return {
        name: user[0].name,
        role: user[0].role.name,
        permission: pemissions[0].permission.name
    }

};

usersRepository.insert  = async (user) => {
    return dbContext
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
            })
        .then((v)=> {
            // return 'User created with role successfully'
            return v;
        })
        .catch((e) => {
            throw new Error('ID_NOT_FOUND');
        })
}

usersRepository.assignPermissionToRole = async (data) => {
    return dbContext
        .query('CALL assign_permission_to_role (:role_id, :permission_id, :permission_name)',
            {replacements: { role_id: data.role_id, permission_id: data.permission_id, permission_name: data.permission_name, }})
        .then((v)=> {
            return 'permission assigned to role successfully'
        })
        .catch((e) => {
            return e;
        })
}

usersRepository.update = async (users) => {
};

usersRepository.deleteById = (id) =>{
}

module.exports = usersRepository;

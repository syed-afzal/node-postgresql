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
};

usersRepository.assignRole = async (data) => {
    return dbContext
        .query('CALL assign_role_to_user (:role_id, :role_name, :user_id)',
            {
                replacements: {
                    role_id: data.role_id,
                    role_name: data.role_name,
                    user_id: data.user_id,
                }
            })
        .then((v)=> {
            return v;
        })
        .catch((e) => {
            console.log('Error : ', e)
            return e;
        })
}

usersRepository.assignPermissionsToRole = async (data) => {
    console.log(data.permissions)
    return dbContext
        .query('CALL assign_permissions_to_role (:permission_id, ARRAY[:permissions], :role_id)',
            {
                replacements: {
                    permission_id: data.permission_id,
                    permissions: data.permissions,
                    role_id: data.role_id,
                }
            })
        .then((v)=> {
            return v;
        })
        .catch((e) => {
            console.log('Error : ', e);
            return e;
        })
}

usersRepository.update = async (users) => {
};

usersRepository.deleteById = (id) =>{
}

module.exports = usersRepository;

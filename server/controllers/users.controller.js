const hepler = require('../helpers/requestUtilties');
const userService = require('../services/users.service');

const usersController = {};

usersController.getUser = async (req, res) => {
    const isEmpty = obj => Object.keys(obj).length <= 0;
    if (!isEmpty(req.query)) {
        const options = {};
        options.where = {};
        if (req.query.sortBy) {
            options.order = [];
            const orderBy = req.query.orderBy ? req.query.orderBy : 'DESC';
            options.order.push([req.query.sortBy, orderBy])
        }
        if (req.query.name)
            options.where['name'] = req.query.name;
        if (req.query.dob)
            options.where['dob'] = req.query.dob;
        return res.status(200).send(await userService.getUser(options));
    }
    return res.status(200).send(await userService.getUser());
};

usersController.getUserById = async (req, res) => {
    try {
        const id = req.params.id;
        const task = await userService.getUserById({ id });
        res.status(200).send(task);
    } catch (e) {
        res.status(400).send(e.message);
    }
};

usersController.getUsersWithPermissions = async (req, res) => {
    res.status(200).send(await service.findAllUsersWithPermissions());
};


usersController.createUser = async (req, res) => {

};

usersController.updateUser = async (req, res) => {

};

usersController.deleteUser = async (req, res) => {

};

module.exports =  usersController;

const { Op } = require("sequelize");

const hepler = require('../helpers/request.utilties');
const userService = require('../services/users.service');
const messages = require('../config/server.messages');
const serverResponse = require('../helpers/server.responses');


const usersController = {};

usersController.login = async (req,res) => {
    // check required fields
    const required = ['email', 'password'];
    const data = req.body;
    const fieldsVerified = hepler.fieldsValidaton(data, required);
    if (!fieldsVerified.success)
        serverResponse.sendError(res, fieldsVerified);
    const loginData = await userService.login(data, res);
    return serverResponse.sendSuccess(res, loginData.message, loginData.user)
};

usersController.searchUser = async (req, res) => {
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
        if (req.query.createdAt) {
            const start = new Date(req.query.createdAt);
            start.setUTCHours(0,0,0,0);

            const end = new Date(req.query.createdAt);
            end.setUTCHours(23,59,59,59);
            options.where['createdAt'] = {
                [Op.lt]: end,
                [Op.gt]: start,
            }
        }
        return res.status(200).send(await userService.searchUser(options));
    }
    return res.status(200).send(await userService.searchUser());
};

usersController.getUser = async (req, res) => {
    try {
        const id = req.user.id;
        const task = await userService.getUser(id);
        res.status(200).send(task);
    } catch (e) {
        res.status(400).send(e.message);
    }
};

usersController.getUsersWithPermissions = async (req, res) => {
    res.status(200).send(await userService.findAllUsersWithPermissions());
};


usersController.createUser = async (req, res) => {
    // check required fields
    const required = ['email'];
    const data = req.body;
    const fieldsVerified = hepler.fieldsValidaton(data, required);
    if (!fieldsVerified.success)
        return serverResponse.sendError(res,requiredFields);
    try {
        await userService.createUser(data);
        serverResponse.sendSuccess(res, messages.USER_CREATED_SUCCESFULL);
    } catch (e) {
        serverResponse.sendError(res,e)
    }
};

usersController.updateUser = async (req, res) => {

};

usersController.deleteUser = async (req, res) => {

};

module.exports =  usersController;

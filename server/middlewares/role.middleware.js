module.exports = {
    verifyRole: (...roleName) => {
        const isAllowed = role => roleName.indexOf(role) > -1;

        // return a middleware
        return (request, response, next) => {
            if (request.user && isAllowed(request.user.userRole.name))
                next(); // role is allowed, so continue on the next middleware
            else {
                response.status(403).json({message: "Forbidden"}); // user is forbidden
            }
        }
    }
};

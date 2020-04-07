exports.checkRequire = (data) => {
    for (const key in requirements) {
        if (data[key] === '' || data[key] === null || !data[key]) {
            return {
                code: 400,
                success: false,
                message: "Please Send " + key
            };
        }
    }
    return {
        success: true
    }
};

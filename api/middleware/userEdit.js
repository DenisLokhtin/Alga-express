const Package = require("../models/Package");

const userEdit = (user, package, updateData) => {
    const result = {};

    if (user._id.toString() !== package.user.toString()) {
        result.code = 400;
        result.error = 'Доступ запрещен';
    }

    if (package.status === 'ISSUED') {
        result.code = 400;
        result.error = 'Заказ выполнен - редактировнию не подлежит';
    }

    if (updateData.trackNumber ||
        updateData.title ||
        updateData.amount ||
        updateData.price ||
        updateData.country ||
        updateData.width ||
        updateData.length ||
        updateData.height ||
        updateData.urlPackage) {

        package.trackNumber = updateData.trackNumber || package.trackNumber;
        package.title = updateData.title || package.title;
        package.amount = updateData.amount || package.amount;
        package.price = updateData.price || package.price;
        package.country = updateData.country || package.country;
        package.width = updateData.width || package.width;
        package.length = updateData.length || package.length;
        package.height = updateData.height || package.height;
        package.urlPackage = updateData.urlPackage || package.urlPackage;
    } else {
        result.code = 400;
        result.error = 'Доступ запрещен';
    }

    result.code = 200;
    result.success = package;
    console.log(result.success);
    return result;
};

module.exports = userEdit;


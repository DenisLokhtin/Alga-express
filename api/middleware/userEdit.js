const userEdit = (user, packageOrder, updateData) => {
    const result = {};

    if (user._id.toString() !== packageOrder.user.toString()) {
        result.code = 403;
        result.error = 'Доступ запрещен';
    }

    if (packageOrder.status === 'DONE') {
        result.code = 403;
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
        updateData.urlPackage ||
        updateData.currency) {

        packageOrder.trackNumber = updateData.trackNumber || packageOrder.trackNumber;
        packageOrder.currency = updateData.currency || packageOrder.currency;
        packageOrder.title = updateData.title || packageOrder.title;
        packageOrder.amount = updateData.amount || packageOrder.amount;
        packageOrder.price = updateData.price || packageOrder.price;
        packageOrder.country = updateData.country || packageOrder.country;
        packageOrder.width = updateData.width || packageOrder.width;
        packageOrder.length = updateData.length || packageOrder.length;
        packageOrder.height = updateData.height || packageOrder.height;
        packageOrder.urlPackage = updateData.urlPackage || packageOrder.urlPackage;
    } else {
        result.code = 403;
        result.error = 'Доступ запрещен';
    }

    result.code = 200;
    result.success = packageOrder;
    return result;
};

module.exports = userEdit;


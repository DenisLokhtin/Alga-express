const adminEdit = (user, packageOrder, updateData, price) => {
    const result = {};

    if (packageOrder.status === 'ISSUED') {
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
        updateData.status ||
        updateData.deleted ||
        updateData.cargoPrice ||
        updateData.cargoWeight ||
        updateData.urlPackage) {

        packageOrder.trackNumber = updateData.trackNumber || packageOrder.trackNumber;
        packageOrder.title = updateData.title || packageOrder.title;
        packageOrder.amount = updateData.amount || packageOrder.amount;
        packageOrder.price = updateData.price || packageOrder.price;
        packageOrder.country = updateData.country || packageOrder.country;
        packageOrder.width = updateData.width || packageOrder.width;
        packageOrder.length = updateData.length || packageOrder.length;
        packageOrder.height = updateData.height || packageOrder.height;
        packageOrder.urlPackage = updateData.urlPackage || packageOrder.urlPackage;

        if (updateData.cargoWeight) {
            packageOrder.cargoWeight = updateData.cargoWeight;
            packageOrder.status = updateData.status || packageOrder.status;
            if (packageOrder.country === "USA")
                packageOrder.cargoPrice = updateData.cargoWeight * price.usa;
            if (packageOrder.country === "TURKEY")
                packageOrder.cargoPrice = updateData.cargoWeight * price.turkey;
            if (packageOrder.country === "CHINA")
                packageOrder.cargoPrice = updateData.cargoWeight * price.china;
        }

        packageOrder.deleted = updateData.deleted || packageOrder.deleted;ву

    } else {
        result.code = 400;
        result.error = 'Доступ запрещен';
    }

    result.code = 200;
    result.success = packageOrder;
    return result;
};

module.exports = adminEdit;
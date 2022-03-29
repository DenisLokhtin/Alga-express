const comparisonValue = (width, length, height, weight, price) => {
    const sizePriceFixed = ((width * length * height / 6000) * price).toFixed(2);
    const weightPriceFixed = (weight * price).toFixed(2);
    const sizePrice = Number(sizePriceFixed);
    const weightPrice = Number(weightPriceFixed);

    if (sizePrice >= weightPrice) {
        return sizePrice;
    } else {
        return weightPrice
    }
};

const adminEdit = (user, packageOrder, updateData, price) => {
    const result = {};
    if (packageOrder.status === 'DONE') {
        result.code = 406;
        result.error = 'Заказ выполнен - редактировнию не подлежит';
    }

    if (updateData.trackNumber ||
        updateData.title ||
        updateData.amount ||
        updateData.price ||
        updateData.country ||
        updateData.flight ||
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
        packageOrder.flight = updateData.flight || packageOrder.flight;
        packageOrder.width = updateData.width || packageOrder.width;
        packageOrder.length = updateData.length || packageOrder.length;
        packageOrder.height = updateData.height || packageOrder.height;
        packageOrder.urlPackage = updateData.urlPackage || packageOrder.urlPackage;
        packageOrder.status = updateData.status || packageOrder.status;

        if (updateData.cargoWeight) {
            packageOrder.cargoWeight = updateData.cargoWeight;
            if (packageOrder.country === "usa") {
                packageOrder.cargoPrice = updateData.cargoWeight * price.usa;
            }
            if (packageOrder.country === "turkey") {
                packageOrder.cargoPrice = updateData.cargoWeight * price.turkey;
            }
            if (packageOrder.country === "turkeyGround") {
                packageOrder.cargoPrice = updateData.cargoWeight * price.turkeyGround;
            }
            if (packageOrder.country === "china") {
                packageOrder.cargoPrice = updateData.cargoWeight * price.china;
            }
            if (packageOrder.country === "chinaGround") {
                packageOrder.cargoPrice = updateData.cargoWeight * price.chinaGround;
            }
        }

        if (updateData.width && updateData.height && updateData.length) {
            packageOrder.width = updateData.width;
            packageOrder.length = updateData.length;
            packageOrder.height = updateData.height;

            if (packageOrder.country === "usa") {
                packageOrder.cargoPrice = comparisonValue(updateData.width, updateData.length, updateData.height, packageOrder.cargoWeight, price.usa);
            }

            if (packageOrder.country === "turkey") {
                packageOrder.cargoPrice = comparisonValue(updateData.width, updateData.length, updateData.height, packageOrder.cargoWeight, price.turkey);
            }

            if (packageOrder.country === "turkeyGround") {
                packageOrder.cargoPrice = comparisonValue(updateData.width, updateData.length, updateData.height, packageOrder.cargoWeight, price.turkeyGround);
            }

            if (packageOrder.country === "china") {
                packageOrder.cargoPrice = comparisonValue(updateData.width, updateData.length, updateData.height, packageOrder.cargoWeight, price.china);
            }
            if (packageOrder.country === "chinaGround") {
                packageOrder.cargoPrice = comparisonValue(updateData.width, updateData.length, updateData.height, packageOrder.cargoWeight, price.chinaGround);
            }
        }

        if (packageOrder.cargoPrice) packageOrder.status = 'DELIVERED';
        packageOrder.deleted = updateData.deleted || packageOrder.deleted;

    } else {
        result.code = 403;
        result.error = 'Доступ запрещен';

    }

    result.code = 200;
    result.success = packageOrder;
    return result;
};

module.exports = adminEdit;
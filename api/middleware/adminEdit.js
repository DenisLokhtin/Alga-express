const adminEdit = (user, packageOrder, updateData, price) => {
    const result = {};
    console.log('adminEdit', updateData.status);
    if (packageOrder.status === 'DONE') {
        result.code = 406;
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
        packageOrder.status = updateData.status || packageOrder.status;

        if (updateData.cargoWeight) {
            packageOrder.cargoWeight = updateData.cargoWeight;
            packageOrder.status = 'PROCESSED';

            if (packageOrder.country === "USA") {
                const sizePrice = (packageOrder.width * packageOrder.length * packageOrder.height / 6000) * price.usa;
                const weightPrice = updateData.cargoWeight * price.usa;
                if (sizePrice >= weightPrice) packageOrder.cargoPrice = sizePrice;
                if (sizePrice <= weightPrice) packageOrder.cargoPrice = weightPrice;
            }
            if (packageOrder.country === "TURKEY") {
                const sizePrice = packageOrder.width * packageOrder.length * packageOrder.height / 6000;
                const weightPrice = updateData.cargoWeight * price.turkey;
                if (sizePrice >= weightPrice) packageOrder.cargoPrice = sizePrice;
                if (sizePrice <= weightPrice) packageOrder.cargoPrice = weightPrice;
            }
            if (packageOrder.country === "CHINA") {
                const sizePrice = packageOrder.width * packageOrder.length * packageOrder.height / 6000;
                const weightPrice = updateData.cargoWeight * price.china;
                if (sizePrice >= weightPrice) packageOrder.cargoPrice = sizePrice;
                if (sizePrice <= weightPrice) packageOrder.cargoPrice = weightPrice;
            }
        }

        if (updateData.width) {
            packageOrder.width = updateData.width;
            packageOrder.status = 'PROCESSED';

            if (packageOrder.country === "USA") {
                const sizePrice = updateData.width * packageOrder.length * packageOrder.height / 6000;
                const weightPrice = packageOrder.cargoWeight * price.usa;
                if (sizePrice >= weightPrice) packageOrder.cargoPrice = sizePrice;
                if (sizePrice <= weightPrice) packageOrder.cargoPrice = weightPrice;
            }
            if (packageOrder.country === "TURKEY") {
                const sizePrice = updateData.width * packageOrder.length * packageOrder.height / 6000;
                const weightPrice = packageOrder.cargoWeight * price.turkey;
                if (sizePrice >= weightPrice) packageOrder.cargoPrice = sizePrice;
                if (sizePrice <= weightPrice) packageOrder.cargoPrice = weightPrice;
            }
            if (packageOrder.country === "CHINA") {
                const sizePrice = updateData.width * packageOrder.length * packageOrder.height / 6000;
                const weightPrice = packageOrder.cargoWeight * price.china;
                if (sizePrice >= weightPrice) packageOrder.cargoPrice = sizePrice;
                if (sizePrice <= weightPrice) packageOrder.cargoPrice = weightPrice;
            }
        }

        if (updateData.height) {
            packageOrder.height = updateData.height;
            packageOrder.status = "PROCESSED";

            if (packageOrder.country === "USA") {
                const sizePrice = (packageOrder.width * updateData.height * packageOrder.length / 6000) * price.usa;
                const weightPrice = packageOrder.cargoWeight * price.usa;
                if (sizePrice >= weightPrice) packageOrder.cargoPrice = sizePrice;
                if (sizePrice <= weightPrice) packageOrder.cargoPrice = weightPrice;
            }
            if (packageOrder.country === "TURKEY") {
                const sizePrice = (packageOrder.width * updateData.height * packageOrder.length / 6000) * price.turkey;
                const weightPrice = packageOrder.cargoWeight * price.turkey;
                if (sizePrice >= weightPrice) packageOrder.cargoPrice = sizePrice;
                if (sizePrice <= weightPrice) packageOrder.cargoPrice = weightPrice;
            }
            if (packageOrder.country === "CHINA") {
                const sizePrice = (packageOrder.width * updateData.height * packageOrder.length / 6000) * price.china;
                const weightPrice = packageOrder.cargoWeight * price.china;
                if (sizePrice >= weightPrice) packageOrder.cargoPrice = sizePrice;
                if (sizePrice <= weightPrice) packageOrder.cargoPrice = weightPrice;
            }
        }

        if (updateData.length) {
            packageOrder.length = updateData.length;
            packageOrder.status = "PROCESSED";

            if (packageOrder.country === "USA") {
                const sizePrice = (packageOrder.width * packageOrder.height * updateData.length / 6000) * price.usa;
                const weightPrice = packageOrder.cargoWeight * price.usa;
                if (sizePrice >= weightPrice) packageOrder.cargoPrice = sizePrice;
                if (sizePrice <= weightPrice) packageOrder.cargoPrice = weightPrice;
            }
            if (packageOrder.country === "TURKEY") {
                const sizePrice = (packageOrder.width * packageOrder.height * updateData.length / 6000) * price.turkey;
                const weightPrice = packageOrder.cargoWeight * price.turkey;
                if (sizePrice >= weightPrice) packageOrder.cargoPrice = sizePrice;
                if (sizePrice <= weightPrice) packageOrder.cargoPrice = weightPrice;
            }
            if (packageOrder.country === "CHINA") {
                const sizePrice = (packageOrder.width * packageOrder.height * updateData.length / 6000) * price.china;
                const weightPrice = packageOrder.cargoWeight * price.china;
                if (sizePrice >= weightPrice) packageOrder.cargoPrice = sizePrice;
                if (sizePrice <= weightPrice) packageOrder.cargoPrice = weightPrice;
            }
        }


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
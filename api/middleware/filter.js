const fromToCreate = fromTo => {
    let date = null;
    if (fromTo.from && fromTo.to)
        date = {
            $in: [fromTo.from, fromTo.to]
        }
    if ((fromTo.from) && (!fromTo.to))
        date = {
        $gte: fromTo.from
        }
    return date;
};

const checkHistoryBuyouts = (data, user_id, fromTo) => {
    const filterData = {};

    if ((data.role === 'admin') || (data.role === 'user')) {
        filterData.deleted = false;
    }
    const date = fromToCreate(fromTo);
    if (date) filterData.date = date;

    if (user_id) filterData.user = user_id;
    if (data.history) {
        filterData.status = 'ORDERED';
    } else {
        filterData.status = {$ne: 'ORDERED'};
    }

    return filterData;
}

const checkHistoryPackages = (data, user_id, fromTo) => {
    const filterData = {
        deleted: {$ne: true},
        status: {$ne: 'ERASED'}
    }
    const date = fromToCreate(fromTo);
    if (date) filterData.date = date;

    if (user_id) filterData.user = user_id;
    if (data.history) {
            filterData.status = 'DONE';
    } else {
            filterData.status = {$in: ['NEW', 'REGISTERED', 'ON_WAREHOUSE', 'ON_WAY', 'DELIVERED']};
    }
    if (data.packageFind) filterData[data.category] = data.packageFind;

    return filterData;
};

const checkHistoryPayments = (data, user_id, fromTo) => {
    const filterData = {};
    const date = fromToCreate(fromTo);

    if (date) filterData.date = date;
    if (user_id) {
        filterData.user = user_id;
    }
    data.history ? filterData.status = true : filterData.status = false;

    return filterData;
}


const filter = (inputData, type) => {
    if ((inputData.role === 'admin') || (inputData.role === 'superAdmin')) {
        if (inputData.id) {
            if (type === 'packages') {
                return checkHistoryPackages(inputData, inputData.id, {from: inputData.from, to: inputData.to});
            } else if (type === 'buyouts') {
                return checkHistoryBuyouts(inputData, inputData.id, {from: inputData.from, to: inputData.to});
            } else if (type === 'payments') {
                return checkHistoryPayments(inputData, inputData.id, {from: inputData.from, to: inputData.to});
            }
        } else {
            if (type === 'packages') {
                return checkHistoryPackages(inputData, null, {from: inputData.from, to: inputData.to});
            } else if (type === 'buyouts') {
                return checkHistoryBuyouts(inputData, null, {from: inputData.from, to: inputData.to});
            } else if (type === 'payments') {
                return checkHistoryPayments(inputData, null, {from: inputData.from, to: inputData.to});
            }

        }
    }

    if (inputData.role === 'user') {
        if (type === 'packages') {
            return checkHistoryPackages(inputData, inputData.id, {from: inputData.from, to: inputData.to});
        } else if (type === 'buyouts') {
            return checkHistoryBuyouts(inputData, inputData.id, {from: inputData.from, to: inputData.to});
        } else if (type === 'payments') {
            return checkHistoryPayments(inputData, inputData.id, {from: inputData.from, to: inputData.to});
        }

    }

};

module.exports = filter;
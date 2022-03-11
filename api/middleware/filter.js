const checkHistoryBuyouts = (data, user_id) => {
    const filterData = {};

    if ((data.role === 'admin') || (data.role === 'user')) {
        filterData.deleted = false;
    }

    if (user_id) filterData.user = user_id;

    if (data.history) {
        filterData.status = 'ORDERED';
    } else {
        filterData.status = {$ne: 'ORDERED'};
    }

    return filterData;
}

const checkHistoryPackages = (data, user_id) => {
    const filterData = {
        deleted: {$ne: true},
        status: {$ne: 'ERASED'}
    }

    if (user_id) filterData.user = user_id;

    if (data.history) {

        if (filterData.status) {
            filterData.status = 'DONE';
        }

    } else {

        if (filterData.status) {
            filterData.status = {$in: ['NEW', 'REGISTERED', 'ON_WAREHOUSE', 'ON_WAY', 'DELIVERED']};
        }

    }

    return filterData;
};

const checkHistoryPayments = (data, user_id) => {
    const filterData = {};

    if (user_id) {
        filterData.user = user_id
    }

    data.history ? filterData.status = true : filterData.status = false;

    return filterData
}


const filter = (inputData, type) => {
    if ((inputData.role === 'admin') || (inputData.role === 'superAdmin')) {
        if (inputData.id) {
            if (type === 'packages') {
                return checkHistoryPackages(inputData, inputData.id);
            } else if (type === 'buyouts') {
                return checkHistoryBuyouts(inputData, inputData.id);
            } else if (type === 'payments') {
                return checkHistoryPayments(inputData, inputData.id);
            }
        } else {
            if (type === 'packages') {
                return checkHistoryPackages(inputData);
            } else if (type === 'buyouts') {
                return checkHistoryBuyouts(inputData);
            } else if (type === 'payments') {
                return checkHistoryPayments(inputData);
            }

        }
    }

    if (inputData.role === 'user') {
        if (type === 'packages') {
            return checkHistoryPackages(inputData, inputData.id);
        } else if (type === 'buyouts') {
            return checkHistoryBuyouts(inputData, inputData.id);
        } else if (type === 'payments') {
            return checkHistoryPayments(inputData, inputData.id);
        }

    }

};

module.exports = filter;
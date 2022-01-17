const checkHistory = (data, user_id) => {
    const filterData = {
        deleted: {$ne: true},
        status: {$ne: 'ERASED'}
    }

    if (user_id) filterData.user = user_id;

    if (data.history) {

        if (filterData.status) {
            filterData.status = 'ISSUED';
        }

    } else {

        if (filterData.status) {
            filterData.status = {$in: ['NEW', 'REGISTERED', 'ON_WAREHOUSE', 'ON_WAY', 'PROCESSED', 'ISSUE']};
        }

    }

    return filterData;
};

const filter = (inputDate) => {
    if (inputDate.role === 'user') return  checkHistory(inputDate, inputDate.user_id);

    if (inputDate.role === 'admin') {

        if (inputDate.id) {
            return  checkHistory(inputDate, inputDate.id);
        } else {
            return  checkHistory(inputDate);
        }
    }

    if (inputDate.role === 'warehouseman')
        if (inputDate.id) {
            return  checkHistory(inputDate, inputDate.id);
        } else {
            return  checkHistory(inputDate);
        }
};

module.exports = filter;
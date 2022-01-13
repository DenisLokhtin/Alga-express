const checkHistory = (data, user_id) => {
    console.log('in check history');
    const filterData = {
        deleted: {$ne: true},
    }

    console.log(data);
    if (user_id) filterData.user = user_id;

    if (data.history) {

        filterData.status = 'ISSUED';

    } else {

        filterData.status = {$ne: 'ISSUED'};

    }

    return filterData;
};

const filter = (inputDate, user) => {
    console.log('in filter', inputDate);
    console.log('in filter', user);
    if (user.role === 'user') return  checkHistory(inputDate, user._id);
    if (user.role === 'admin') return  checkHistory(inputDate, inputDate.user);
    if (user.role === 'warehouseman') return  checkHistory(inputDate, inputDate.user);
};

module.exports = filter;
export const isEmpty = value => (
    value === undefined ||
    value === null ||
    (typeof value === 'object' && Object.keys(value).length === 0) ||
    (typeof value === 'string' && value.trim().length === 0)
);

export const sortArrByDate = (arr, dateField, reversed = false) => {
    arr.sort((a, b) => new Date(a[dateField]) - new Date(b[dateField]));
    if (reversed) {
        arr.reverse();
    }
    return arr;
}

export const setDateFormat = (date) => {
    let year = date.getFullYear().toString();
    let month = (date.getMonth() + 1).toString();
    let day = date.getDate().toString();

    while (year.length !== 4) {
        year = '0' + year;
    }
    while (month.length !== 2) {
        month = '0' + month;
    }
    while (day.length !== 2) {
        day = '0' + day;
    }

    return `${year}-${month}-${day}`;
}

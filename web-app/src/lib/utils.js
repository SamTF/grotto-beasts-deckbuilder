// General sorting method that works for firefox and chrome
export const sortByKey = (data, key, ascending = true) => {
    data.sort((a, b) => {
        const valueA = typeof a[key] === 'string' ? a[key].toLowerCase() : a[key];
        const valueB = typeof b[key] === 'string' ? b[key].toLowerCase() : b[key];

        if (valueA < valueB) {
            return ascending ? -1 : 1;
        }
        if (valueA > valueB) {
            return ascending ? 1 : -1;
        }
        return 0;
    });
};

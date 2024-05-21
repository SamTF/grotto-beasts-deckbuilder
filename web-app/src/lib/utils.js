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

// Export array of Objects by a given property
export const groupBy = (data, key) => {
    return data.reduce((x, y) => {
        (x[y[key]] = x[y[key]] || []).push(y);
        return x;
    }, {});
}

// Random number between 0 and 100
export const rng = () => {
    return Math.floor(Math.random() * 100)
}

// Randomly pull and remove item from array
export const getRandomItem = array => {
    const i = Math.floor(Math.random() * array.length);
    const randomElement = array.splice(i, 1)[0];

    return randomElement
}

// Wait X MS before executing rest of code
export const delay = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Deep clone array of nested Objects
export const deepClone = obj => {
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }

    // Handle Array
    if (Array.isArray(obj)) {
        return obj.map(deepClone);
    }

    // Handle Object
    const clonedObj = {}
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            clonedObj[key] = deepClone(obj[key])
        }
    }

    return clonedObj
}
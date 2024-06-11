export const cleanData = (data, filters) => {
    let dataFiltered = [];
    data.forEach(element => {
        let newObject = new Object();
        filters.forEach(filter => {
            newObject[filter] = element[filter];
        })
        dataFiltered.push(newObject);
    });
    return dataFiltered;
}

export const getOneData =(data, id)=> {
    const foundObject = data.find(obj => obj.id === id);
    if (foundObject) {
        return foundObject;
    } else {
        return null;
    }
}

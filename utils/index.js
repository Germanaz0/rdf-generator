const _each = require('lodash/each');
const _find = require('lodash/find');
const _mapKeys = require('lodash/mapKeys');

let Person = require('./Person');

getSheetName = (config) => {
    return Object.keys(config)[0];
}

mapParsedFile = (inputFile, fileConfig) => {
    fileConfig = fileConfig[getSheetName(fileConfig)];
    let mapConfig = fileConfig.map;
    
    let processItem = (item) => {
        let newItem = _mapKeys(item, (val, key) => {
            let newKeyItem = _find(mapConfig, (o) => o.from == key);

            return newKeyItem.to || key;
        });

        // return newItem;
        return new Person(newItem);
    };

    let newData = [];
    inputFile.forEach((item, key) => {
        newData.push(processItem(item));
    });

    return newData;
};

module.exports = {
    mapParsedFile,
    getSheetName
};
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fillMissingValues = exports.areArrayEqualNoOrder = exports.areObjectEqual = void 0;
function areObjectEqual(obj1, obj2) {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
}
exports.areObjectEqual = areObjectEqual;
//consider two array equals if they have the same elements but not necessarily in the same order
function areArrayEqualNoOrder(arr1, arr2) {
    if (arr1.length !== arr2.length)
        return false;
    for (let i = 0; i < arr1.length; i++) {
        if (!arr2.find((obj2) => areObjectEqual(arr1[i], obj2)))
            return false;
    }
    return true;
}
exports.areArrayEqualNoOrder = areArrayEqualNoOrder;
function fillMissingValues(source, target) {
    let retVal = [...source];
    for (let i = 0; i < target.length; i++) {
        const objTarget = target[i];
        if (!retVal.find((objSource) => areObjectEqual(objSource, objTarget)))
            retVal.push(objTarget);
    }
    return retVal;
}
exports.fillMissingValues = fillMissingValues;

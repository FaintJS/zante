"use strict";
exports.__esModule = true;
var chalk_1 = require("chalk");
exports.uniqueArray = function (array, back) {
    if (back === void 0) { back = false; }
    var unique = [];
    if (back) {
        array.reverse().forEach(function (item) {
            if (unique.indexOf(item) === -1) {
                unique.push(item);
            }
        });
        return unique.reverse();
    }
    else {
        array.forEach(function (item) {
            if (unique.indexOf(item) === -1) {
                unique.push(item);
            }
        });
        return unique;
    }
};
exports.onlyKeys = function (obj, keys) {
    var o = {};
    for (var name_1 in obj) {
        if (keys.indexOf(name_1) > -1) {
            o[name_1] = obj[name_1];
        }
    }
    return o;
};
exports.isPromise = function (promise) {
    return promise && 'then' in promise && typeof promise.then === 'function' && 'catch' in promise && typeof promise["catch"] === 'function';
};
exports.error = function (condition, msg) {
    if (condition) {
        console.log(chalk_1["default"].red('❌  Zante Error: ' + msg));
        process.exit(0);
    }
};

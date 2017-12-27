"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
const objectHasRequiredKeys = exports.objectHasRequiredKeys = (values, required) => {
    const status = required.every(el => {
        return values.hasOwnProperty(el);
    });

    console.log(status);
};
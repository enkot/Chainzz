// @flow

export const objectHasRequiredKeys = (values: Object, required: Array<string>): boolean => {
    const status = required.every((el) => {
        return values.hasOwnProperty(el);
    });

    return status;
}; 
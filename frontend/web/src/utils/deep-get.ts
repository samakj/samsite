export const deepGet = (
    obj: object,
    keys: (string | number)[],
    defaultValue: any = undefined,
): any => {
    let result = obj;

    for (const key of keys) {
        if (!result) {
            return defaultValue;
        } else if (result.hasOwnProperty(key)) {
            // @ts-ignore -> obj depth is unknown so cant provide proper typing
            result = result[key];
        } else {
            return defaultValue;
        }
    }

    return result;
};

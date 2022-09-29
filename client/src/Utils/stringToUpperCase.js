export const strToUpper = (str) => {
    if (str && str.length > 0) {
        return str[0].toUpperCase() + str.substring(1);
    }
}
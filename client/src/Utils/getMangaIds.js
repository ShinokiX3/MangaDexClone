export const getMangasIds = (arr) => {
    return arr.map(({ id }) => `&ids[]=${id}`);
}
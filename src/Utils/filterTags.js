export const filterTags = (arr, value) => {
    return [...arr?.filter(val => val?.attributes?.group === value)];
}
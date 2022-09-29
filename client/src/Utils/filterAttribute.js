export const filterSomeAttribute = (arr, selector, attribute) => {
    const filtered = arr?.filter(val => val?.type === selector)[0];
    return attribute ? filtered?.attributes[attribute] || 'No ' + attribute : filtered;
}
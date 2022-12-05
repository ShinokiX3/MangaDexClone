export const findOutUniqGroups = (array, selector = 'group') => {
    const newArray = [];
    for (let idx = 0; idx < array.length; idx++) {
        if (!newArray.some(el => el.type === array[idx]?.attributes[selector])) {
            newArray.push({type: array[idx]?.attributes[selector], tags: []})
        }
        const typesArrIndex = newArray.findIndex(type => type.type === array[idx]?.attributes[selector]);
        newArray[typesArrIndex]?.tags.push(array[idx]);
    }
    return newArray;
}
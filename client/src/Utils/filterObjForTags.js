export const filterObjForTags = (obj, tag, split = false) => {
    const filtered = !split ? obj[tag] : splitObj(obj[tag]);
    return !Array.isArray(filtered) ? [filtered] : filtered;
}

const splitObj = (obj) => {
    const filtered = [];
    for (let key in obj) {
        filtered.push({[key]: obj[key]})
    }
    return filtered;
}
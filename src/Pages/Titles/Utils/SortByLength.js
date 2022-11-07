export function sortByTagsLength(tags) {
    tags.sort((a, b) => {
        if (a.tags.length > b.tags.length) {
            return 1;
        }
        if (a.tags.length < b.tags.length) {
            return -1;
        }
        return 0;
    });
    return tags;
}
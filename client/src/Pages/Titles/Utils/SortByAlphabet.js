export function sortTagsByAlphabet(tags) {
    tags.forEach(tag => {
        tag.tags.sort((a, b) => {
            if (a.attributes.name.en > b.attributes.name.en) {
                return 1;
            }
            if (a.attributes.name.en < b.attributes.name.en) {
                return -1;
            }
            return 0;
        });
    });
    return tags;
}
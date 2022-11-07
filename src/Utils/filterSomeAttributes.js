export const filterSomeAttributes = (arr = [], selectors = []) => {
    return selectors?.map(el => {
        return arr.find(it => it['related'] === el)
    })
}
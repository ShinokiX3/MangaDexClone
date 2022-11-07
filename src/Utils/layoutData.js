export const collectData = (arr, selector) => {
    const findVariables = () => {
        const resArr = arr.reduce((prev, curr) => {
            return prev.includes(curr?.attributes[selector]) ? [...prev] : [...prev, curr?.attributes[selector]]
        }, [])
        return resArr
    }
    const summaryByVariables = (variables) => {
        const resArr = [];
        for (let i = 0; i < variables.length; i++) {
            resArr.push({[`${selector[0].toUpperCase()}${selector.substring(1)} ${variables[i]}`]: []})
            for (let j = 0; j < arr.length; j++) {
                if (arr[j]?.attributes[selector] === variables[i]) {
                    resArr[i][`${selector[0].toUpperCase()}${selector.substring(1)} ${variables[i]}`].push(arr[j]);
                }
            }
        }
        return resArr;
    }
    return summaryByVariables(findVariables());
}
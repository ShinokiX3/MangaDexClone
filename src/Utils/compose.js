export const compose = (...funcs) => (ini) => {
    return funcs.reduceRight((prev, func) => func(prev), ini);
}

// const compose = (...funcs) => {
//    return funcs.reduceRight((prev, func) => func(prev), 0);
// 
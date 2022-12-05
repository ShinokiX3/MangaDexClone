export const compose = (...funcs) => (ini) => {
    return funcs.reduceRight((prev, func) => func(prev), ini);
}
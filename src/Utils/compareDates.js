export const compareDates = (date) => {
    const researchedDate = new Date(date);
    const currentDate = new Date();

    const yDiff = currentDate.getFullYear() - researchedDate.getFullYear();
    const mDiff = currentDate.getMonth() - researchedDate.getMonth();
    const dDiff = currentDate.getDay() - researchedDate.getDay();
    const hDiff = currentDate.getHours() - researchedDate.getHours();
    const minDiff = currentDate.getMinutes() - researchedDate.getMinutes();
    const secDiff = currentDate.getSeconds() - researchedDate.getSeconds();

    const diff = [{years: yDiff}, {months: mDiff}, {days: dDiff}, {hours: hDiff}, {minutes: minDiff}, {seconds: secDiff}]
    const result = {difference: ''};

    const compareRecurcive = (arr, idx) => {
        const val = Object.values(arr[idx])[0];
        const key = Object.keys(arr[idx])[0];
        if (val > 0 || arr.length - 1 === idx) {
            result.difference = `${val} ${key} ago`;
            return;
        }
        idx += 1;
        compareRecurcive(arr, idx);
    }

    compareRecurcive(diff, 0);
    return result.difference;
}
export const cutString = (string, byNum) => {
    if (string === undefined) return `Unknown`;
    return string.length > byNum ? `${string.substring(0, byNum)}...` : string;
}
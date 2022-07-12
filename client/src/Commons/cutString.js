export const cutString = (string, byNum) => {
    if (string === undefined) return `Unnamed`;
    return string.length > byNum ? `${string.substring(0, byNum)}...` : string;
}
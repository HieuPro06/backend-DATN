const base64Url = str => {
    return btoa(str).replace(/\+/,'-')
        .replace(/\//,'-')
        .replace(/\=/,'');
}
const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const date = today.getDate();
    const res = `${year}-${month}-${date}`;
    return res;
}
const reverseString = (str) => {
    return str.split('').reverse().join('');
}
module.exports = {
    base64Url,
    getCurrentDate,
    reverseString
};
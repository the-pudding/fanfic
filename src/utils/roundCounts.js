export default function roundCounts(num, decimal) {
    if (typeof value === 'number' && !isNaN(value)) {
        console.log(num)
    }
    let roundedNum;
    if (decimal == "whole") {
        roundedNum = Math.round(num);
    } else if (decimal == "ten") {
        roundedNum = Math.round(num / 10) * 10;
    } else if (decimal == "one decimal") {
        roundedNum = Math.round(num * 10) / 10;
    } else {
        roundedNum == num;
    }

    if (isNaN(roundedNum)) {
        console.log(num)
    }

    return roundedNum;
}

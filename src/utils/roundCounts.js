export default function roundCounts(num, decimal) {
    let roundedNum;
    if (decimal == "whole") {
        roundedNum = Math.round(num);
        if (roundedNum < 1) {
            roundedNum = "<1" 
        }
    } else if (decimal == "ten") {
        roundedNum = Math.round(num / 10) * 10;
    } else if (decimal == "one decimal") {
        roundedNum = Math.round(num * 10) / 10;
    } else {
        roundedNum == num;
    }

    return roundedNum;
}

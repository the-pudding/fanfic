import fs from "fs";
import * as d3 from "d3";
const INPATH = "tasks/output/combinedCategoryTags/";
const files = fs.readdirSync(INPATH);
const csvFiles = files.filter(file => { 
    return file.includes(".csv");
 })

let combinedArray = [];

function combineCounts(data) {
    const combinedCounts = {};

    data.forEach((arr, index) => {
        arr.forEach(item => {
            const { value, count } = item;
            if (!combinedCounts[value]) {
                combinedCounts[value] = new Array(data.length).fill(0);
            }
            combinedCounts[value][index] = parseInt(count, 10);
        });
    });

    const combinedArray = Object.keys(combinedCounts).map(value => {
        const counts = combinedCounts[value];
        const result = { value };
        counts.forEach((count, index) => {
            result[`${nameColumn(index)}`] = count;
        });
        return result;
    });

    return combinedArray;
}

function nameColumn(index) {
    if (index == 0) { return "canon"}
    else if (index == 1) { return "femslash"}
    else if (index == 2) { return "gen"}
    else if (index == 3) { return "noncanon"}
    else if (index == 4) { return "noRPF"}
    else if (index == 5) { return "semicanon"}
    else if (index == 6) { return "slash"}
    else if (index == 7) { return "straight"}
    else { return "yesRPF"}
}

function combineAdd(file) {
    const raw = fs.readFileSync(`${INPATH}${file}`, "utf8");
    const csvData = d3.csvParse(raw);
    combinedArray.push(csvData)
}

function init() {
    csvFiles.map(combineAdd);
    console.log(combinedArray.length);
    const dataOutput = combineCounts(combinedArray);
    
    let csv = d3.csvFormat(dataOutput);
    
    fs.writeFileSync(`tasks/output/combinedCategoryTags/all/all_combined-tags.csv`, csv);
}

init();
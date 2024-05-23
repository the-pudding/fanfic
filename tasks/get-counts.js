import fs from "fs";
import * as d3 from "d3";
const INPATH = "tasks/output/combinedTags/";
const files = fs.readdirSync(INPATH);

let allTags = [];

function pause(delay) {
    return new Promise(resolve => {
        setTimeout(resolve, delay)
    })
}

function loadFile(file) {
    console.log(file)
    const raw = fs.readFileSync(`${INPATH}${file}`, "utf8");
    const csvData = d3.csvParse(raw);

    getTags(csvData, file)
}

function getTags(csvData, file) {
    const relationship = file.split(".csv")[0];
    csvData.map(function(d, i) {
        const splitTags = d.tags.split(",")
        allTags.push(splitTags)
    })

    const flatTags = allTags.flat(Infinity)
    const counts = countUnique(flatTags);

    writeCSV(counts, relationship);
}

function countUnique(data) {
    const counts = {};

    data.forEach(str => {
        if (counts[str]) {
            counts[str]++;
        } else {
            counts[str] = 1;
        }
    });

    return counts;
}

function writeCSV(counts, relationship) {
    const sortedCounts = Object.entries(counts).sort((a, b) => b[1] - a[1]);
    const csvLines = ['value,count'];
    
    sortedCounts.forEach(([key, value]) => {
        csvLines.push(`${key},${value}`);
    });

    const csv = csvLines.join('\n');
    
    fs.writeFileSync(`tasks/output/tagCounts/${relationship}_tag-counts.csv`, csv);
}

function clearData() {
    allTags = [];
}

(async () => {
    for (const file of files) {
        try {
            await loadFile(file)
            await clearData()
        }
        catch (err) {
            console.log(err);
        }
        await pause(5000);
    }
})();
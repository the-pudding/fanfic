import fs from "fs";
import * as d3 from "d3";
const INPATH = "tasks/output/tagCounts/";
const files = fs.readdirSync(INPATH);
const csvFiles = files.filter(file => { 
    return file.includes(".csv");
 })
const categoriesRaw = fs.readFileSync("static/assets/1-tagged-relationships.csv", "utf8");
const categoriesCSV = d3.csvParse(categoriesRaw);

const slashFilter = categoriesCSV.filter(d => d.relType == "M/M");
const femslashFilter = categoriesCSV.filter(d => d.relType == "F/F");
const straightFilter = categoriesCSV.filter(d => d.relType == "F/M");
const genFilter = categoriesCSV.filter(d => d.relType == "Gen");
const canonFilter = categoriesCSV.filter(d => d.isCanon == "Yes");
const nonCanonFilter = categoriesCSV.filter(d => d.isCanon == "No");
const semiCanonFilter = categoriesCSV.filter(d => d.isCanon == "Semi-Canon");
const yesRPFFilter = categoriesCSV.filter(d => d.isRPF == "Yes");
const noRPFFilter = categoriesCSV.filter(d => d.isRPF == "No");

let combinedCategoryTags = [];
let combinedCounts = []

function pause(delay) {
    return new Promise(resolve => {
        setTimeout(resolve, delay)
    })
}

function filterFiles(file, filter) {
    let relationship = file.replaceAll("-", " ").replaceAll("_", "/").replaceAll("tag counts.csv", "");
    relationship = relationship.substring(0, relationship.length - 1);

    let match = filter.find((element) => element.relationship == relationship);
    console.log(relationship)

    if (match !== undefined) {
        loadData(file)
    }
}

function loadData(file) {
    const raw = fs.readFileSync(`${INPATH}${file}`, "utf8");
    const csvData = d3.csvParse(raw);
    combinedCategoryTags.push(csvData);
}

function combineCounts(data) {
    if (data.length > 0) {
        const counts = {};

        data.flat().forEach(item => {
            const {value, count} = item;
            if (counts[value]) {
                counts[value] += parseInt(count, 10);
            } else {
                counts[value] = parseInt(count, 10);
            }
        });
    
        combinedCounts = Object.keys(counts).map(key => ({ value: key, count: counts[key] }));
    }
}

function saveCounts(data, category) {
    let sortedData = d3.sort(data, (a, b) => d3.descending(a.count, b.count))
    // let concatData = [].concat(...data).map(d => ({
    //     ...d
    // }));
    let csv = d3.csvFormat(sortedData);
    
    fs.writeFileSync(`tasks/output/combinedCategoryTags/${category}_combined-tags.csv`, csv);
}

(async () => {
    for (const file of csvFiles) {
        try {
            await filterFiles(file, noRPFFilter);
            await combineCounts(combinedCategoryTags);
        }
        catch (err) {
            console.log(err);
        }
        await pause(1000);
    }
    saveCounts(combinedCounts, "noRPF")
})();
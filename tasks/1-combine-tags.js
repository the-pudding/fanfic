import fs from "fs";
import * as d3 from "d3";
const INPATH = "static/assets/tags/";
let files = fs.readdirSync(INPATH);
files = files.filter(file => { 
    return file.includes(".csv");
 })
const categoriesRaw = fs.readFileSync("static/assets/1-tagged-relationships.csv", "utf8");
const categoriesCSV = d3.csvParse(categoriesRaw);

let shipData = [];

function pause(delay) {
    return new Promise(resolve => {
        setTimeout(resolve, delay)
    })
}

function findMatch(file, key) {
    let match;
    if (key == "relationship") {
        match = categoriesCSV.find((element) => element.fileName == file).relationship;
    } else if (key == "relType") {
        match = categoriesCSV.find((element) => element.fileName == file).relType;
    } else if (key == "isCanon") {
        match = categoriesCSV.find((element) => element.fileName == file).isCanon;
    } else if (key == "isRPF") {
        match = categoriesCSV.find((element) => element.fileName == file).isRPF;
    }
    return match
}

function organize(file) {
    const raw = fs.readFileSync(`${INPATH}${file}`, "utf8");
    const csvData = d3.csvParse(raw);
    const concatData = [].concat(...csvData).map(d => ({
		...d,
        fileName: file,
        taggedRel: findMatch(file, "relationship"),
        relType: findMatch(file, "relType"),
        isCanon: findMatch(file, "isCanon"),
        isRPF: findMatch(file, "isRPF")

	}));
    const groupedData = d3.groups(concatData, d => d.title); 

    groupedData.map(combineWorks)
    saveCSV(shipData, findMatch(file, "relationship"))
}

function saveCSV(data, taggedRel) {
    let relationship = (taggedRel).replaceAll(" ", "-").replaceAll("/", "_");
    console.log(relationship)

    let concatData = [].concat(...data).map(d => ({
        ...d
    }));
    let csv = d3.csvFormat(data);
    fs.writeFileSync(`tasks/output/combinedTags/${relationship}.csv`, csv);
}

function combineWorks(data,i) {
    const fandom = data[1][0].fandom;
    const relationship = data[1][0].relationship;
    const taggedRel = data[1][0].taggedRel;
    const relType = data[1][0].relType;
    const isCanon = data[1][0].isCanon;
    const isRPF = data[1][0].isRPF;
    const title = data[0];
    const datetime = data[1].filter(d => d.datetime !== "")[0].datetime;
    const kudos = data[1].filter(d => d.kudos !== "")[0].kudos;
    const rating = data[1].filter(d => d.rating !== "")[0].rating;
    let warnings = data[1].filter(d => d.warnings !== "");
    warnings = warnings.map(a => a.warnings).toString();
    let tags = data[1].filter(d => d.tags !== "");
    tags = tags.map(a => a.tags).toString();

    shipData.push({fandom, relationship, taggedRel, title, relType, isCanon, isRPF, datetime, kudos, rating, warnings, tags})
}

function clearData() {
    shipData = [];
}


(async () => {
    for (const file of files) {
        try {
            await organize(file)
            await clearData()
        }
        catch (err) {
            console.log(err);
        }
        await pause(2000);
    }
})();
import fs from "fs";
import * as d3 from "d3";
const INPATH = "static/assets/tags/";
const files = fs.readdirSync(INPATH);
const categoriesRaw = fs.readFileSync("static/assets/1-tagged-relationships.csv", "utf8");
const categoriesCSV = d3.csvParse(categoriesRaw);

let groupedData = [];
let singleShipData = [];

function pause(delay) {
    return new Promise(resolve => {
        setTimeout(resolve, delay)
    })
}

function saveCSV(data) {
    let relationship = (data[0].relationship).replaceAll(" ", "-").replaceAll("/", "_");
    console.log(relationship)

    let concatData = [].concat(...data).map(d => ({
        ...d
    }));
    let csv = d3.csvFormat(data);
    fs.writeFileSync(`tasks/output/${relationship}.csv`, csv);
}

async function groupData(file) {
    const raw = fs.readFileSync(`${INPATH}${file}`, "utf8");
    const csvData = d3.csvParse(raw);
    groupedData = d3.groups(csvData, d => d.title);  
}

async function buildAggregate(data, file) {

    for (const work of data[1]) {
        try {
            await getKeyValues(work[1], file);
        } 
        catch (err) {
            console.log(err);
        }
        // await saveCSV(singleShipData);
        // await pause(100);
    }
}

async function getKeyValues(data, file) {
    console.log(data)

    // const fandom = data[0].fandom;
    // const relationship = data[0].relationship;
    // const title = data[0];
    // console.log(relationship)
    // const datetime = data.filter(d => d.datetime !== "")[0].datetime;
    // const kudos = data.filter(d => d.kudos !== "")[0].kudos;
    // const rating = data.filter(d => d.rating !== "")[0].rating;
    // let warnings = data.filter(d => d.warnings !== "");
    // warnings = warnings.map(a => a.warnings).toString();
    // let tags = data.filter(d => d.tags !== "");
    // tags = tags.map(a => a.tags).toString();
    // const match = categoriesCSV.find((element) => element.fileName == file)
    // const relType = match.relType;
    // const isCanon = match.isCanon;
    // const isRPF = match.isRPF;
    // singleShipData.push({fandom, relationship, relType, isCanon, isRPF, title, datetime, kudos, rating, warnings, tags})
}

async function buildOutput() {
    // const datetime = data.filter(d => d.datetime !== "")[0].datetime;
    // const kudos = data.filter(d => d.kudos !== "")[0].kudos;
    // const rating = data.filter(d => d.rating !== "")[0].rating;
    // let warnings = data.filter(d => d.warnings !== "");
    // warnings = warnings.map(a => a.warnings).toString();
    // let tags = data.filter(d => d.tags !== "");
    // tags = tags.map(a => a.tags).toString();
    // const match = categoriesCSV.find((element) => element.fileName == file)
    // const relType = match.relType;
    // const isCanon = match.isCanon;
    // const isRPF = match.isRPF;
    // singleShipData.push({fandom, relationship, relType, isCanon, isRPF, title, datetime, kudos, rating, warnings, tags})
}

(async () => {
    for (const file of files) {
        try {
            await groupData(file);
            await buildAggregate(groupedData, file);
            await pause(1000);
        } 
        catch (err) {
            console.log(err);
        }
    }
})();
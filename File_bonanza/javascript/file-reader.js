const path = require("path");
const fs = require("fs");
const yaml = require("js-yaml");
const csv = require("csv-parser");
const xml2js = require("xml2js");

const fileTypes = {
  ".txt": readText,
  ".xml": readXml,
  ".yaml": readYaml,
  ".json": readJson,
  ".csv": readCsv,
};

async function readText(filePath) {
  return fs.promises.readFile(filePath, "utf-8");
}

async function readXml(filePath) {
  const xml = await fs.promises.readFile(filePath, "utf-8");
  return xml2js.parseStringPromise(xml);
}

async function readYaml(filePath) {
  const yamlText = await fs.promises.readFile(filePath, "utf-8");
  return yaml.load(yamlText);
}

async function readJson(filePath) {
  const jsonText = await fs.promises.readFile(filePath, "utf-8");
  return JSON.parse(jsonText);
}

async function readCsv(filePath) {
  const data = [];
  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (row) => data.push(row))
      .on("end", () => resolve(data))
      .on("error", (error) => reject(error));
  });
}

async function readFile(filePath) {
  const fileExtension = path.extname(filePath);
  const contents = await fileTypes[fileExtension](filePath);
  console.log(contents);
}

const filePath = process.argv[2];
readFile(filePath).catch(console.error);

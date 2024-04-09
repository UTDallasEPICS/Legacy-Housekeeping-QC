// Retrieved from https://stackoverflow.com/questions/49752889/how-can-i-read-a-local-file-with-papa-parse

const readCSV = async (filePath) => {
  const fs = require("fs");
  const papa = require("papaparse");
  const csvFile = fs.readFileSync(filePath);
  const csvData = csvFile.toString();
  return new Promise((resolve) => {
    papa.parse(csvData, {
      header: true,
      complete: (results) => {
        console.log("Complete", results.data.length, "records.");
        resolve(results.data);
      },
    });
  });
};

export default readCSV;

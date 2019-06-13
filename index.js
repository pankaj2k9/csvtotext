const csvFilePath = "./PartialActionItems-2019-June-11-2154.csv";
const csv = require("csvtojson");
const fs = require("fs");
csv()
    .fromFile(csvFilePath)
    .then(jsonObj => {
        jsonObj.forEach(data => {
            writeFileFromCsv(data);
        });
    });
const writeFileFromCsv = data => {
    let maxDataLength = Object.keys(data).length;
    for (key in data) {
        let index = Object.keys(data).indexOf(key);
        if (data.hasOwnProperty(key)) {
            fileAppend(`__S-${key}__`);
            fileAppend(data[key]);
            fileAppend(`__E-${key}__`);
        }
        if (index === maxDataLength - 1) {
            fileAppend(
                `\n\n______________________________________________________________________________________________________________\n\n`
            );
        }
    }
};

const fileAppend = line => {
    let fd;

    try {
        fd = fs.openSync("convertedTextFile.txt", "a+");
        fs.appendFileSync(fd, line + "\n\n", null, null);
    } catch (err) {
        /* Handle the error */
    } finally {
        if (fd !== undefined) fs.closeSync(fd);
    }
};

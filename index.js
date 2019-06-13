const fileName = "FullAction-Items-Proof-Reading-Export-June-11";
const csvFilePath = `./${fileName}.csv`;
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
            fileAppend(
                `-------------------------------------------S-${key}-------------------------------------------`
            );
            fileAppend(data[key]);
            fileAppend(
                `-------------------------------------------E-${key}-------------------------------------------`
            );
        }
        if (index === maxDataLength - 1) {
            fileAppend(`\n\n*******************************************\n\n`);
        }
    }
};

const fileAppend = line => {
    let fd;

    try {
        fd = fs.openSync(`${fileName}.txt`, "a+");
        fs.appendFileSync(fd, line + "\n\n", null, null);
    } catch (err) {
        /* Handle the error */
    } finally {
        if (fd !== undefined) fs.closeSync(fd);
    }
};

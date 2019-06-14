const fileName = "FullAction-Items-Proof-Reading-Export-June-11";
const formattedFileName = "converted";
const file_name = `./${fileName}.txt`;
const formatted_file_name = `./${formattedFileName}.txt`;
const readline = require("readline");
const fs = require("fs");
const { Parser } = require("json2csv");

fs.readFile(file_name, { encoding: "utf-8" }, function(err, data) {
    if (err) throw error;

    let dataArray = data.split("\n");
    const searchKeyword1 = "-------------------------------------------S-";
    const searchKeyword2 = "-------------------------------------------E-";
    const searchKeyword3 = "-------------------------------------------";

    for (let index = 0; index < dataArray.length; index++) {
        if (dataArray[index].includes(searchKeyword2)) {
            dataArray.splice(index, 1);
        }
    }
    for (let index = 0; index < dataArray.length; index++) {
        if (dataArray[index].includes(searchKeyword1)) {
            dataArray[index] = dataArray[index].replace(
                new RegExp(searchKeyword1),
                ""
            );
        }
    }
    for (let index = 0; index < dataArray.length; index++) {
        if (dataArray[index].includes(searchKeyword3)) {
            dataArray[index] = dataArray[index].replace(
                new RegExp(searchKeyword3),
                ":"
            );
        }
    }

    const updatedData = dataArray.join("\n");
    fs.writeFile(formatted_file_name, updatedData, err => {
        if (err) throw err;
        console.log("Successfully updated the file data");
        spiitRow();
    });
});

const spiitRow = () => {
    var jsonValue = [];
    fs.readFile(formatted_file_name, { encoding: "utf-8" }, function(
        err,
        data
    ) {
        if (err) throw error;

        let dataArray = data.split(
            "*******************************************"
        );

        for (let index = 0; index < dataArray.length; index++) {
            jsonValue.push(stringToJson(dataArray[index]));
        }
        jsonToCsv(jsonValue);
    });
};

const stringToJson = data => {
    var newSingleObject = {};
    var lineArray = data.split("\n");
    let filteredLineArray = lineArray.filter(el => {
        return el != "";
    });
    for (let index = 0; index < filteredLineArray.length; index++) {
        if (
            filteredLineArray[index].includes(":") &&
            filteredLineArray[index].length < 25
        ) {
            var propName = filteredLineArray[index].replace(
                new RegExp(":"),
                ""
            );
            newSingleObject[propName] = getAllValueAfterColon(
                index + 1,
                filteredLineArray
            );
        }
    }
    return newSingleObject;
};

const getAllValueAfterColon = (idx, filteredLineArray) => {
    let concatValue = "";
    for (let index = idx; index < filteredLineArray.length; index++) {
        if (filteredLineArray[index].includes(":")) {
            break;
        }
        concatValue += filteredLineArray[index];
    }
    return concatValue;
};

const jsonToCsv = data => {
    var getOneElement = data[0];
    var fields = [];
    for (key in getOneElement) {
        fields.push(key);
    }

    const json2csvParser = new Parser({ fields });
    const csv = json2csvParser.parse(data);

    fs.writeFile(`updated${fileName}.csv`, csv, "utf8", function(err) {
        if (err) {
            console.log(
                "Some error occured - file either not saved or corrupted file saved."
            );
        } else {
            console.log("It's saved!");
        }
    });
};

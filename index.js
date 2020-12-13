const ExcelJS = require("exceljs");

const workbook = new ExcelJS.Workbook();
const instanceArray = [];
const instanceKey = "InstanceId";
const filename = "./instanceIds.xlsx";

const scrubADub = async () => {
  const results = await workbook.xlsx.readFile(filename);
  results.worksheets[0]._rows.forEach((cell) => {
    const value = cell._cells[0]._value.model.value;
    if (value === undefined) {
      return;
    }
    const newInstance = {};
    newInstance[instanceKey] = value;
    instanceArray.push(newInstance);
  });
  console.log("instanceArray: ", JSON.stringify(instanceArray));
  console.log("number of instances: ", instanceArray.length);
};

scrubADub();

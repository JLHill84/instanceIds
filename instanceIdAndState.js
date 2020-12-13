// load exceljs to generate xlsx
const ExcelJS = require("exceljs");
const workbook = new ExcelJS.Workbook();
const worksheet = workbook.addWorksheet('InstanceIdAndState')
const table = worksheet.getTable('InstanceIdAndState')
const filename = "./instanceIdAndState.xlsx";
// Load the AWS SDK for Node.js
const AWS = require('aws-sdk');
// Set the region 
AWS.config.update({ region: 'us-east-1' });

// Create EC2 service object
const ec2 = new AWS.EC2({ apiVersion: '2016-11-15' });

const params = {
    DryRun: false,
};

ec2.describeInstances(params, function (err, data) {
    if (err) {
        console.log("Error", err.stack);
    } else {
        data.Reservations.forEach(group => {
            worksheet.addRow(
                [group.Instances[0].InstanceId, group.Instances[0].State.Name === 'stopped' ? 'Stopped' : '']
            )
        })
        try {
            workbook.xlsx.writeFile('InstanceIdAndState.xlsx')
        } catch (error) {
            console.log('error: ', error)
        }

    }
});

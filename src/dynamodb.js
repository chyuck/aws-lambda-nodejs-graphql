const dynamodb = require("aws-sdk/clients/dynamodb");
const client = new dynamodb.DocumentClient();

function getOrder(id) {
    const params = {
        TableName: process.env.DYNAMO_DB_TABLE,
        Key: {
            id: id
        }
    };

    return client.get(params).promise();
}

function getOrders() {
    const params = {
        TableName: process.env.DYNAMO_DB_TABLE
    }; 

    return client.scan(params).promise();
}

module.exports = {
    getOrder: getOrder,
    getOrders: getOrders
};
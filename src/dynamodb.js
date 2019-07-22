const dynamodb = require("aws-sdk/clients/dynamodb");
const client = new dynamodb.DocumentClient();
const uuid = require("uuid/v1");

async function createOrder(product, quantity) {
    const timestamp = new Date().toISOString();

    const params = {
        TableName: process.env.DYNAMO_DB_TABLE,
        Item: {
            id: uuid(),
            product: product,
            quantity: quantity,
            active: true,
            created: timestamp,
            updated: timestamp
        }
    };

    await client.put(params).promise();

    return params.Item;
}

async function getOrder(id) {
    const params = {
        TableName: process.env.DYNAMO_DB_TABLE,
        Key: {
            id: id
        }
    };

    const order = await client.get(params).promise();

    return order.Item;
}

async function getOrders() {
    const params = {
        TableName: process.env.DYNAMO_DB_TABLE
    }; 

    const orders = await client.scan(params).promise();

    return orders.Items;
}

async function updateOrder(id, product, quantity) {
    const timestamp = new Date().toISOString();

    const params = {
        TableName: process.env.DYNAMO_DB_TABLE,
        Key: {
            id: id
        },
        ExpressionAttributeValues: {
            ":product": product,
            ":quantity": quantity,
            ":updated": timestamp
        },
        UpdateExpression: "SET product = :product, quantity = :quantity, updated = :updated",
        ReturnValues: "ALL_NEW"
    };

    const result = await client.update(params).promise();

    return result.Attributes;
}

async function deleteOrder(id) {
    const params = {
        TableName: process.env.DYNAMO_DB_TABLE,
        Key: {
            id: id
        }
    };

    await client.delete(params).promise();

    return id;
}

module.exports = {
    createOrder: createOrder,
    getOrder: getOrder,
    getOrders: getOrders,
    updateOrder: updateOrder,
    deleteOrder: deleteOrder
};
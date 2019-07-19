const graphql = require("./graphql");

module.exports.main = async (event) => {
    return await graphql.execute(event.queryStringParameters.query);
};
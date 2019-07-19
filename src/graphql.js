const graphql = require("graphql");
const dynamodb = require("./dynamodb");

const orderType = new graphql.GraphQLObjectType({
    name: "Order",
    fields: {
        id: { type: new graphql.GraphQLNonNull(graphql.GraphQLString) },
        product: { type: new graphql.GraphQLNonNull(graphql.GraphQLString) },
        quantity: { type: new graphql.GraphQLNonNull(graphql.GraphQLInt) },
        active: { type: new graphql.GraphQLNonNull(graphql.GraphQLBoolean) },
        created: { type: new graphql.GraphQLNonNull(graphql.GraphQLString) },
        changed: { type: new graphql.GraphQLNonNull(graphql.GraphQLString) }
    }
});

const qyeryType = new graphql.GraphQLObjectType({
    name: "Query",
    fields: {
        order: {
            type: orderType,
            args: {
                id: { name: "id", type: new graphql.GraphQLNonNull(graphql.GraphQLString)}
            },
            resolve: (_, args) => dynamodb.getOrder(args.id)
        },
        orders: {
            type: new graphql.GraphQLList(orderType),
            resolve: () => dynamodb.getOrders()
        }
    }
});

const schema = new graphql.GraphQLSchema({
    query: qyeryType
});

module.exports.execute = async (query) => {
    try {
        const result = await graphql(schema, query);

        return {
            statusCode: 200,
            body: JSON.stringify(result)
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify(error)
        };
    }
};
const gq = require("graphql");
const dynamodb = require("./dynamodb");

const orderType = new gq.GraphQLObjectType({
    name: "Order",
    fields: {
        id: { type: new gq.GraphQLNonNull(gq.GraphQLString) },
        product: { type: new gq.GraphQLNonNull(gq.GraphQLString) },
        quantity: { type: new gq.GraphQLNonNull(gq.GraphQLInt) },
        active: { type: new gq.GraphQLNonNull(gq.GraphQLBoolean) },
        created: { type: new gq.GraphQLNonNull(gq.GraphQLString) },
        updated: { type: new gq.GraphQLNonNull(gq.GraphQLString) }
    }
});

const qyeryType = new gq.GraphQLObjectType({
    name: "Query",
    fields: {
        order: {
            type: orderType,
            args: {
                id: { name: "id", type: new gq.GraphQLNonNull(gq.GraphQLString) }
            },
            resolve: async (_, args) => dynamodb.getOrder(args.id)
        },
        orders: {
            type: new gq.GraphQLList(orderType),
            resolve: async () => dynamodb.getOrders()
        }
    }
});

const mutationType = new gq.GraphQLObjectType({
    name: "Mutation",
    fields: {
        createOrder: {
            type: orderType,
            args: {
                product: { name: "product", type: new gq.GraphQLNonNull(gq.GraphQLString) },
                quantity: { name: "quantity", type: new gq.GraphQLNonNull(gq.GraphQLInt) }
            },
            resolve: async (_, args) => dynamodb.createOrder(args.product, args.quantity)
        },
        updateOrder: {
            type: orderType,
            args: {
                id: { name: "id", type: new gq.GraphQLNonNull(gq.GraphQLString) },
                product: { name: "product", type: new gq.GraphQLNonNull(gq.GraphQLString) },
                quantity: { name: "quantity", type: new gq.GraphQLNonNull(gq.GraphQLInt) }
            },
            resolve: async (_, args) => dynamodb.updateOrder(args.id, args.product, args.quantity)
        },
        deleteOrder: {
            type: gq.GraphQLString,
            args: {
                id: { name: "id", type: new gq.GraphQLNonNull(gq.GraphQLString) }
            },
            resolve: async (_, args) => dynamodb.deleteOrder(args.id)
        }
    }
});

const schema = new gq.GraphQLSchema({
    query: qyeryType,
    mutation: mutationType
});

module.exports.execute = async (query) => {
    try {
        const result = await gq.graphql(schema, query);

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
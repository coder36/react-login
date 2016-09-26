const { GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLBoolean,
    GraphQLList,
    GraphQLNonNull } = require('graphql');

const auth = require('./auth')

const TokenType = new GraphQLObjectType( {
    name: 'Token',
    description: 'Authentication token',
    fields: {
        token: {type: GraphQLString },
        errors: {type: new GraphQLList(GraphQLString)},
    }
})

const MutationType = new GraphQLObjectType( {
    name: 'mutation_query',
    description: '...',
    fields: {
        create_User: {
            type: TokenType,
            args: {
                username: { type: new GraphQLNonNull(GraphQLString)},
                name: { type: new GraphQLNonNull(GraphQLString)},
                password: { type: new GraphQLNonNull(GraphQLString)}
            },
            resolve: (root, {username, password, name}) => auth.createUser(username, password, name)
        },
    }
});

const ViewerType = new GraphQLObjectType( {
    name: "viewer",
    description: "...",
    fields: ( {
        username: {type: GraphQLString},
        name: {type: GraphQLString},
        errors: {type: new GraphQLList(GraphQLString)}
    }),
})


const QueryType = new GraphQLObjectType( {
    name: "query",
    description: "...",
    fields: {
        viewer: {
            type: ViewerType,
            args: {
                token: { type: new GraphQLNonNull(GraphQLString)}
            },
            resolve: (root, {token}) => auth.getAuthenticatedUser(token)
        },
        token: {
            type: TokenType,
            args: {
                username: { type: new GraphQLNonNull(GraphQLString)},
                password: { type: new GraphQLNonNull(GraphQLString)}
            },
            resolve: (root, {username, password}) => {
                return auth.createToken(username, password)
            }
        }
    }
})

const rootSchema = new GraphQLSchema( {
    query: QueryType,
    mutation: MutationType
});

module.exports = rootSchema;

const {gql} = require('apollo-server');
const users = require('./users');
const sensors = require('./sensors');
const {GraphQLScalarType} = require('graphql');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const area = require('./area');

const dateScalar = new GraphQLScalarType({
    name: 'Date',
    parseValue(value){
        return new Date(value);
    },
    serialize(value){
        return value.getTime();
    },
});

const typeDefs = gql`
    scalar Time
    type Query{
        getVersion: String!
    }
    type Mutation {
        getVersion: String!
    }
`;

const timeScalar = new GraphQLScalarType({
    name: 'Time',
    description: 'Time custom scalar type',
    serialize(value) {
        return value;
    }
});

const resolvers = {
    Query: {
        getVersion: () => 'v1'
    }
};

const schema = makeExecutableSchema({
    typeDefs: [typeDefs, users.typeDefs, sensors.typeDefs, area.typeDefs],
    resolvers: [resolvers, users.resolvers, sensors.resolvers, area.resolvers],
});

module.exports = schema;
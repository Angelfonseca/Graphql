const { gql } = require('apollo-server-express');
const { withFilter } = require('graphql-subscriptions');
const pubsub = require('../../pubsub');
const createArea = require('./mutations/createArea');
const deleteArea = require('./mutations/deleteArea');
const modifyArea = require('./mutations/modifyArea');
const area = require('./queries/area');
const areas = require('./queries/areas');

const typeDefs = gql`
    type ModuleData {
        module: String!
        sensors: [Sensor]  # Make sure Sensor type is defined elsewhere
    }

    type Area {
        id: ID!
        name: String!
        description: String
        modules: [String]
    }

    input AreaInput {
        name: String!
        description: String
        modules: [String]
    }

    extend type Query {
        area(id: ID!): Area
        areas: [Area]
        areaWithModules(id: ID!): [ModuleData]
    }

    extend type Mutation {
        createArea(name: String!, description: String, modules: [String]): Area
        deleteArea(id: ID!): Area
        modifyArea(id: ID!, name: String!, description: String, modules: [String]): Area
    }

    type Subscription {
        areaCreated: Area
        areaDeleted: Area
        areaModified: Area
    }
`;

function filterAreaUpdated(payload) {
    return payload;
}

function filterSensorUpdated(payload) {
    return payload;
}

const resolvers = {
    Query: {
        area: area.getbyId,
        areas,
        areaWithModules: area.getModulesData,
    },
    Mutation: {
        createArea,
        deleteArea,
        modifyArea,
    },
    Subscription: {
        areaCreated: {
            subscribe: withFilter(
                () => pubsub.asyncIterator('AREA_CREATED'),
                filterAreaUpdated,
            ),
        },
        areaDeleted: {
            subscribe: withFilter(
                () => pubsub.asyncIterator('AREA_DELETED'),
                filterAreaUpdated,
            ),
        },
        areaModified: {
            subscribe: withFilter(
                () => pubsub.asyncIterator('AREA_MODIFIED'),
                filterAreaUpdated,
            ),
        },
    },
};

module.exports = {
    typeDefs,
    resolvers,
};

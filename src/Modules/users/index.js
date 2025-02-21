const { gql } = require('apollo-server-express');
const { withFilter } = require('graphql-subscriptions');  
const pubsub = require('../../pubsub');
const createUser = require('./mutations/createUser');
const updateUser = require('./mutations/updateUser');
const deleteUser = require('./mutations/deleteUser');
const login = require('./mutations/loginUser');

const user = require('./queries/user');
const users = require('./queries/users');

const typeDefs = gql`
    type User {
        id: ID!
        name: String!
        username: String!
        email: String!
        password: String!
        role: String!
    }
    type Auth {
        token: String!
        user: User!
    }
    extend type Query {
        user(id: ID!): User
        users: [User]
    }
    extend type Mutation {
        createUser(name: String!, username: String!, email: String!, password: String!, role: String!): User
        updateUser(id: ID!, name: String, username: String, email: String, password: String, role: String): User
        deleteUser(id: ID!): User
        login(username: String!, password: String!): Auth
    }
    type Subscription {
        userCreated: User
        userUpdated: User
        userDeleted: User
    }
`;

function filterUserUpdated(payload){
    return true
}

function filterUserCreated(payload){
    return true
}

const resolvers = {
    Query: {
        user,
        users
    },
    Mutation: {
        createUser,
        updateUser,
        deleteUser,
        login
    },
    Subscription: {
        userCreated: {
            subscribe: withFilter(
                () => pubsub.asyncIterator('USER_CREATED'),
                filterUserCreated
            )
        },
        userUpdated: {
            subscribe: withFilter(
                () => pubsub.asyncIterator('USER_UPDATED'),
                filterUserUpdated
            )
        },
        userDeleted: {
            subscribe: () => pubsub.asyncIterator('USER_DELETED')
        }
    }
};

module.exports = {
    typeDefs,
    resolvers
};

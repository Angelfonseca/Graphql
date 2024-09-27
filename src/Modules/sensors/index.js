const { gql } = require("apollo-server-express");
const { withFilter } = require("graphql-subscriptions");
const pubsub = require("../../pubsub");
const createSensor = require("./mutations/createSensors");
const deleteSensor = require("./mutations/deleteSensors");


const sensor = require("./queries/sensor");
const sensors = require("./queries/sensors");

const typeDefs = gql`
  type Sensor {
    id: ID!
    module: String!
    sensors: [SensorData]
    createdAt: String!
  }

  type SensorData {
    sensor: String!
    amp: Float
    volt: Float
    pot: Float
  }

  input SensorDataInput {
    sensor: String!
    amp: Float!
    volt: Float!
    pot: Float!
  }

  input SensorInput {
    module: String!
    sensors: [SensorDataInput]!
  }

  extend type Query {
    sensor(id: ID!): Sensor
    sensors: [Sensor]
    sensormodule(module: String!): [Sensor]
    sensorbydate(start: String!, end: String!): [Sensor]
    sensorsbydatemodule(start: String!, end: String!, module: String!): [Sensor]
    getMoreActualSensor(module: String!): Sensor


  }

  extend type Mutation {
    createSensor(module: String!, sensors: [SensorDataInput]!): Sensor
    deleteSensor(id: ID!): Sensor
  }

  type Subscription {
    sensorCreated: Sensor
    sensorDeleted: Sensor
  }
`;

function filterSensorUpdated(payload) {
  // Implement filtering logic here
  return true;
}

function filterSensorCreated(payload) {
  // Implement filtering logic here
  return true;
}

const resolvers = {
  Query: {
    sensor: sensor.getSensorbyId,
    sensors: sensors.getSensors,
    sensormodule: sensor.getSensorbyModule,
    sensorbydate: sensor.getSensorsbyDateRange,
    sensorsbydatemodule: sensors.getSensorbyModuleandDate,
    getMoreActualSensor: sensor.getMoreActualSensorforModule

  },
  Mutation: {
    createSensor,
    deleteSensor,
  },
  Subscription: {
    sensorCreated: {
      subscribe: withFilter(
        () => pubsub.asyncIterator("SENSOR_CREATED"),
        filterSensorCreated
      ),
    },
    sensorDeleted: {
      subscribe: withFilter(
        () => pubsub.asyncIterator("SENSOR_DELETED"),
        filterSensorUpdated
      ),
    },
  },
};

module.exports = {
  typeDefs,
  resolvers,
};

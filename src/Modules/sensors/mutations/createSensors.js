const Sensor = require('../../../models/sensors.model');
const pubsub = require('../../../pubsub');

const createSensor = async (_, { module, sensors }) => {
    const newSensor = new Sensor({
        module,
        sensors,
    });

    await newSensor.save();

    // Publish the sensor created event
    pubsub.publish("SENSOR_CREATED", { sensorCreated: newSensor });

    return newSensor;
};

module.exports = createSensor;

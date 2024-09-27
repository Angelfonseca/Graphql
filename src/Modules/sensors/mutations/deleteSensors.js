const Sensor = require('../../../models/sensors.model');
const pubsub = require('../../../pubsub');


const deleteSensor = async (_, { id }, { db }) => {
    const deletedSensor = await db.Sensor.findByIdAndDelete(id);
    if (deletedSensor) {
      pubsub.publish("SENSOR_DELETED", { sensorDeleted: deletedSensor });
      return 1; 
    }
    return 0; 
  }

module.exports = deleteSensor;
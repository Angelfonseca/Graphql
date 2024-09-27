const { model, Schema } = require('mongoose');

const sensorSchema = new Schema({
    module: String,
    sensors: [
        {
            sensor: String,
            amp: Number,
            volt: Number,
            pot: Number
        }
    ],
    createdAt: { type: String, default: () => new Date().toISOString() } // Auto-set createdAt
});

const Sensor = model('Sensor', sensorSchema);
module.exports = Sensor;

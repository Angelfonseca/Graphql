const { get } = require('mongoose');
const Sensor = require('../../../models/sensors.model'); // Importa el modelo correctamente

const getSensors = async (root, arg, context) => {
    return await Sensor.find();
};

const getSensorbyModuleandDate = async (root, { module, start, end }, context) => {
    return await Sensor.find({ module: module, createdAt: { $gte: start, $lte: end } });
}

module.exports = {getSensors, getSensorbyModuleandDate};

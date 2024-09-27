// const { ensureAuth } = require('../../../middleware/auth-middleware');
const Sensor = require('../../../models/sensors.model');

const getSensorbyId = async (root, { id }, context) => {
    // const { error } = await ensureAuth(context.req);
    // if (error) {
    //     throw new Error(error);
    // }

    return await Sensor.findById(id);
};

const getSensorbyModule = async (root, { module }, context) => {
    // const { error } = await ensureAuth(context.req);
    // if (error) {
    //     throw new Error(error);
    // }

    return await Sensor.find({ module: module });
};

const getSensorsbyDateRange = async (root, { start, end }, context) => {
    // const { error } = await ensureAuth(context.req);
    // if (error) {
    //     throw new Error(error);
    // }

    return await Sensor.find({ createdAt: { $gte: start, $lte: end } });
};

const getMoreActualSensorforModule = async (root, module, context) => {
    // Aquí buscamos los sensores por el módulo dado, y luego ordenamos por la fecha de creación (createdAt) de forma descendente.
    return await Sensor.findOne({ module: module }).sort({ createdAt: -1 });
};

module.exports = {getSensorbyId, getSensorbyModule, getSensorsbyDateRange, getMoreActualSensorforModule};
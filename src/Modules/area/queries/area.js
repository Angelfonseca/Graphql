const Area = require('../../../models/area.model');
const pubsub = require('../../../pubsub');
const Sensor = require('../../../models/sensors.model');
const sensorQueries = require('../../sensors/queries/sensor');
// const {ensureAuth} = require('../../../utils/ensureAuth');
const getbyId = async (_, { id }) => {
    // const { error } = await ensureAuth(context.req);
    // if (error) {
    //     throw new Error(error);
    // }
    const area = await Area.findById(id);
    if (!area) {
        throw new Error('Area not found');
    }
    return area;
}

const getModulesData = async (_, { id }) => {
    const area = await Area.findById(id);
    if (!area) {
        throw new Error('Area not found');
    }

    // Fetch all modules data with their sensors
    const modulesDataPromises = area.modules.map(async (module) => {
        const sensors = await Sensor.find({ module }).sort({ createdAt: -1 });
        return { module, sensors: sensors || [] }; // Ensure an empty array if no sensors are found
    });

    // Wait for all promises to resolve
    const modulesData = await Promise.all(modulesDataPromises);

    return modulesData;
};

const getModulesDataTimeRange = async (_, { id, start, end }) => {
    const area = await Area.findById(id);
    if (!area) {
        throw new Error('Area not found');
    }
    const modulesDataPromises = area.modules.map(async (module) => {
        const sensors = await Sensor.find({ module, createdAt: { $gte: start, $lte: end } }).sort({ createdAt: -1 });
        return { module, sensors: sensors || [] };
    }
    );
    const modulesData = await Promise.all(modulesDataPromises);
    return modulesData;
}

module.exports = {getbyId, getModulesData, getModulesDataTimeRange};
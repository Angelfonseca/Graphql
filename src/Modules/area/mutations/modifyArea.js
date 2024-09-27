const Area = require('../../../models/area.model');
const pubsub = require('../../../pubsub');

const modifyArea = async (_, { id, name, description, modules }) => {
    const area = await Area.findById(id);
    area.name = name;
    area.description = description;
    area.modules = modules;
    await area.save();
    return area
}

module.exports = modifyArea;
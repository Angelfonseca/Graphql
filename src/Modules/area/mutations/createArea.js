const Area = require('../../../models/area.model');
const pubsub = require('../../../pubsub');

const createArea = async (_, { name, description, modules }) => {
    const newArea = new Area({
        name,
        description,
        modules,
    });

    await newArea.save();

    // Publish the area created event
    pubsub.publish("AREA_CREATED", { areaCreated: newArea });

    return newArea;
};

module.exports = createArea;
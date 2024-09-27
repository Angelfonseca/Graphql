const Area = require('../../../models/area.model');
const pubsub = require('../../../pubsub');

const deleteArea = async (_, { id }) => {
    const area = await Area.findByIdAndDelete(id);
    pubsub.publish("AREA_DELETED", { areaDeleted: area });
    return area;
}

module.exports = deleteArea;

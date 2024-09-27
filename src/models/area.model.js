const {model, Schema} = require('mongoose');

const areaSchema = new Schema({
    name: String,
    description: String,
    modules: [],
    createdAt: {type: String, default: () => new Date().toISOString()} // Auto-set createdAt
});

const Area = model('Area', areaSchema);
module.exports = Area;
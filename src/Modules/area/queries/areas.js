const Area = require('../../../models/area.model');
// const {ensureAuth} = require('../../../utils/ensureAuth');
module.exports = async () => {
    // const { error } = await ensureAuth(context.req);
    // if (error) {
    //     throw new Error(error);
    // }
    const areas = await Area.find();
    if (!areas) {
        throw new Error('No areas found');
    }
    return areas;
}
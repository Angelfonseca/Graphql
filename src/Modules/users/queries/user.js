const {ensureAuth} = require('../../../middlewares/auth');
const User = require('../../../models/users.model');

module.exports = async (root, {id}, context) => {
  // const {error} = await ensureAuth(context.req);
  // if (error) {
  //   throw new Error(error);
  // }
  return await User.findById(id);
};
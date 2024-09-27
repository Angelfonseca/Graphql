const User = require('../../../models/users.model');
const { ensureAuth } = require('../../../middlewares/auth');

module.exports = async (root, { id }, context) => {
  console.log('eliminar user ', id)

  const { error } = await ensureAuth(context.req);
  if (error) {
    throw new Error(error);
  }
  return await User.findByIdAndDelete(id)
};

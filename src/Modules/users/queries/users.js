const User = require('../../../models/users.model');
// import { ensureAuth } from '../../../middleware/auth';

module.exports = async () => {
    // const { error } = await ensureAuth(context.req);
    // if (error) {
    //     throw new Error(error);
    // }
    // const users = await User.find();
    const users = await User.find()
    if (!users || users.length === 0) {
        throw new Error('No users found');
    }

    return users;
}


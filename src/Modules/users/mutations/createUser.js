const User = require('../../../models/users.model');
const bcrypt = require('bcryptjs');
const pubsub = require('../../../pubsub');

module.exports = async (root,body,context) => {
    console.log('creando usuario');
    console.log(body);  
    const user = new User(body);
    const userCreated = await user.save();
    pubsub.publish('USER_CREATED', { userCreated });
    return userCreated;
}
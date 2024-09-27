const User = require('../../../models/users.model');
const bcrypt = require('bcryptjs');
const pubsub = require('../../../pubsub');

const generatePassword = password => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(10, (err, salt) => {
      if(err) return reject(err);
        bcrypt.hash(password, salt, (err, hash) => {
          if(err) return reject(err);
          return resolve(hash)
        });
    });
  })
}

module.exports = async (root, body, context) => {
  console.log(body)
  if (body.password) {
    body.password = await generatePassword(body.password)
  }
  const user = await User.findByIdAndUpdate(body.id, body, { new: true })
  pubsub.publish('USER_UPDATED', { user });
  return user
};

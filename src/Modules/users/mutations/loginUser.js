const User = require('../../../models/users.model');
const { createToken } = require('../../../middlewares/auth')

const isPasswordMatch = (userToAttempt, password) => {
  
  return new Promise((resolve) => {
    // Check the supplied password against the hash stored for this username 
    if (!userToAttempt.password) {
      resolve(false)
    }
    userToAttempt.checkPassword(password, (err, isMatch) => {
      if(err) resolve(false);
      resolve(isMatch);
    });
  });
}

module.exports = async (root, { username, password }, context) => {

  const user = await User.findOne({ username: username })
  if (!user) {
    console.log('No matching documents.');
    throw new Error('User not found');
  }
  const isMatch = await isPasswordMatch(user, password)
  if (!isMatch) {
    throw new Error('Authentication not found');
  }
  const token = createToken(user)
  return { user, token };
};

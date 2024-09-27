const jwt = require('jwt-simple');
const moment = require('moment');
require('dotenv').config()

const secret = process.env.JWT_SECRET

const ensureAuth = async (req) => {
  if (!req.headers.authorization) {
    return { error: 'Error de autorización.' }
  }
  const token = req.headers.authorization.replace(/['"]+/g, '')
  let payload
  try {
    payload = jwt.decode(token, secret)
    if (payload.exp <= moment().unix()) {
      return { error: 'Token de autorización expirado.' }
    }
  } catch (error) {
     return { error: 'Token de autorización invalido.' }
  }

  return { success: 'auth correcto' }
}

const createToken = (user) => {
  let payload = {
    id: user.id,
    iat: moment().unix(),
    exp: moment().add(7, 'days').unix()
  }
  return jwt.encode(payload, secret)
}
  
module.exports = { ensureAuth, createToken }
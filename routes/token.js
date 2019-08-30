const jwt = require('jsonwebtoken');

const secretkey = "secretkey"

module.exports = {
  verify(req) {
    const token = req.headers['token'];
    if(typeof token == 'undefined') return -1

    return jwt.verify(token, secretkey, (err, authData) => {
      if(err)
        return -1
      else
        return authData.payload
    })
  },

  send(payload, res){
    jwt.sign({payload}, secretkey, { expiresIn: '30m' }, (err, token) => {
      res.json({token})
    });
  }
};

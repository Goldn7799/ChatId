const { createHash } = require('crypto');

// copy array or object
const copy = (data) => {
  return JSON.parse(JSON.stringify(data));
};

// MD5 Encrypt
const enc = (salt, data)=>{
  return createHash('md5').update(`${salt}.${data}.${salt}`).digest('hex')
}

// Export
const Utility = {
  oop: {
    copy,
  },
  md5: {
    enc
  }
};

module.exports = Utility;

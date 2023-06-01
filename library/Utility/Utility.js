import {createHash} from 'crypto';

// copy array or object
const copy = (data) => {
  return JSON.parse(JSON.stringify(data));
};

// MD5 Encrypt
const enc = (salt, data)=>{
  return createHash('md5').update(`${salt}.${data}.${salt}`).digest('hex');
};

// Random
const makeid = (length)=> {
  let result = '';
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() *
charactersLength));
  }
  return result;
};

// Export
const Utility = {
  oop: {
    copy,
  },
  md5: {
    enc,
  },
  opr: {
    makeid,
  },
};

export default Utility;

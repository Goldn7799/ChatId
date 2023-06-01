import chalk from 'chalk';
import config from '../../Config.js';
import Utility from '../Utility/Utility.js';

// Setup Variable
let deviceList = {};

// after 60s, deviceList resetted
setInterval(() => {
  deviceList = {};
}, 60000);

// Checking request
const checkRequest = (rawId)=>{
  const id = Utility.md5.enc('hdr', rawId);
  if (!deviceList[id]) {
    deviceList[id] = 0;
  };
  if (config.appConfig.MaxRequestPerMin < deviceList[id]) {
    console.log(chalk.gray('--_ DDOS Detected _--'))
    return false;
  } else {
    deviceList[id]++;
    return true;
  }
};

// Getting All request device
const getAllRequest = ()=>{
  return Utility.oop.copy(deviceList);
};

// Export
const RequestFilter = {
  checkRequest,
  getAllRequest,
};

export default RequestFilter;

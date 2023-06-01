import chalk from 'chalk';
import fs from 'fs';
import Utility from '../Utility/Utility.js';

// Variable Setup
let users = {};
let chats = {};
let ready = false;
const root = process.cwd();

// Checking Dir and File
const checkChats = ()=>{
  fs.readFile(`${root}/data-store/chats.json`, 'utf-8', (err, res)=>{
    if (err) {
      fs.writeFile(`${root}/data-store/chats.json`, JSON.stringify({}),
          (errs)=> {
            if (errs) {
              console.log(
                  chalk.red('Failed Creating file ./data-store/chats.json'),
              );
            } else {
              console.log(
                  chalk.green('Success Creating file ./data-store/chats.json'),
              );
              checkChats();
            }
          });
    } else {
      console.log(chalk.blue('Chats DB Loaded'));
      chats = JSON.parse(res);
      ready = true;
    }
  });
};
const checkUsers = ()=>{
  fs.readFile(`${root}/data-store/users.json`, 'utf-8', (err, res)=>{
    if (err) {
      fs.writeFile(`${root}/data-store/users.json`, JSON.stringify({}),
          (errs)=> {
            if (errs) {
              console.log(
                  chalk.red('Failed Creating file ./data-store/users.json'),
              );
            } else {
              console.log(
                  chalk.green('Success Creating file ./data-store/users.json'),
              );
              checkUsers();
            }
          });
    } else {
      console.log(chalk.blue('Users DB Loaded'));
      users = JSON.parse(res);
      checkChats();
    }
  });
};
fs.mkdir(`${root}/data-store`, (err)=>{
  if (err) {
    console.log(
        chalk.yellow('Skipped Creating Directory ./data-store'),
    );
  } else {
    console.log(
        chalk.green('Success Created Directory ./data-store'),
    );
  }
  checkUsers();
});

// Get State
// // State Ready
const getReady = ()=>{
  return ready;
};
// // Users
const eUsers = {
  getAll: ()=>{
    return Utility.oop.copy(users);
  },
  getById: (id)=>{
    if (users[id]) {
      return Utility.oop.copy(users[id]);
    } else {
      return false;
    }
  },
  getAllId: ()=>{
    return Object.keys(users);
  },
  checkUser: (id)=>{
    const allId = Object.keys(users);
    if (allId.includes(id)) {
      return true;
    } else {
      const username = `User_${Utility.opr.makeid(6)}`;
      users[id] = {
        AuthCode: Utility.opr.makeid(18),
        DisplayName: username,
        UserName: `${username.toLocaleLowerCase()}`,
        Bio: '',
        BlueTick: 'none',
        LastOnline: Date.now(),
        Regios: 'en_us',
        PublicSettings: {
          ShowLastOnline: false,
          ShowProfilePicAsPublic: false,
          ShowOnSearch: false,
          ShowBannerAsPublic: false,
        },
        UserState: {
          IsBanned: 'no',
          ContactList: [],
          GroupList: [],
          BlockList: [],
          PrivateChat: [],
        },
      };
      return true;
    }
  },
};
// // Chats
const eChats = {
  getAll: ()=>{
    return Utility.oop.copy(chats);
  },
  getById: (id)=>{
    if (chats[id]) {
      return Utility.oop.copy(id);
    } else {
      return false;
    }
  },
};

// Exports
const databases = {
  getReady,
  eUsers,
  eChats,
};

export default databases;

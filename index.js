import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import config from './Config.js';
import RequestFilter from './library/App/RequestFilter.js';
import Utility from './library/Utility/Utility.js';
import databases from './library/Database/Databases.js';
import chalk from 'chalk';

// Main SC
const main = ()=>{
  console.log(chalk.cyan('Starting MainSC'));
  /* Setup Express */
  const app = express();
  app.use(cors({
    origin: config.appConfig.AllowedOrigin,
  }));
  app.use(bodyParser.json({
    limit: config.appConfig.MaxRequestMB,
  }));

  /* Get Method */
  app.get('*', (req, res)=>{
    if (RequestFilter.checkRequest(req.rawHeaders)) {
      req.next();
    } else {
      res.status(429).json({
        success: false,
        message: 'You make req over limit',
      });
    }
  });
  // template
  app.get('/', (req, res)=>{
    if (RequestFilter.checkRequest(req.rawHeaders)) {
      res.status(200).json({
        success: true,
        message: 'Succes Get',
      });
    } else {
      res.status(200).json({
        success: false,
        message: 'You make req over limit',
      });
    }
  });
  // Users
  app.get('/users/check/:id/:email', (req, res)=>{
    const {id, email} = req.params;
    if (id && id.length > 10) {
      const isSuccess = databases.eUsers.checkUser(id, email)
      const userData = databases.eUsers.getById(id)
      res.status(200).json({
        success: isSuccess,
        message: 'None',
        data: {
          Email: userData.Email,
          DisplayName: userData.DisplayName,
          UserName: userData.UserName,
          Bio: userData.Bio,
          BlueTick: userData.BlueTick,
          UserState: userData.UserState
        }
      });
    } else {
      res.status(403).json({
        success: false,
        message: 'Invalid Request',
      });
    }
  });

  app.get('/users/getUsername/:id/:userId', (req, res)=>{
    const {id, userId} = req.params;
    const selectedUser = databases.eUsers.getById(id)
    const selectedUserRequest = databases.eUsers.getById(userId)
    if (selectedUser) {
      let DisplayName = selectedUser.DisplayName;
      if (selectedUserRequest) {
        const contactIdList = selectedUserRequest.UserState.ContactList.map(contact => {
          return contact.Id
        })
        if (contactIdList.includes(id)) {
          DisplayName = ((selectedUserRequest.UserState.ContactList).filter(contact => contact.Id === id))[0].AsNote
        };
      };
      res.status(200).json({
        success: true,
        message: 'Success Get Name/UserName',
        data: {
          DisplayName,
          UserName: selectedUser.UserName
        }
      })
    } else {
      res.status(404).json({
        success: false,
        message: 'User Not Found'
      })
    }
  })

  // Chats
  app.get('/chats/metadata/group/:id', (req, res)=>{
    const {id} = req.params;
    const selectedChat = databases.eChats.getGcById(id) 
    if (selectedChat) {
      res.status(200).json({
        success: true,
        message: 'Succes Get Chat',
        data: {
          Name: selectedChat.Name,
          Description: selectedChat.Description,
          Owner: selectedChat.Owner,
          PublicSettings: selectedChat.PublicSettings,
          GroupParticipants: selectedChat.GroupParticipants,
        },
      });
    } else {
      res.status(404).json({
        success: false,
        message: `${id} not found`,
      });
    }
  });

  app.post('/chats/MessageNMinimal/fromUser/:userId', (req, res) => {
    const {userId} = req.params;
    const {loadedChatMsg} = req.body;
    if (userId && typeof(loadedChatMsg) === 'object' && (databases.eUsers.getAllId()).includes(userId)) {
      const allChatId = Object.keys(loadedChatMsg);
      let dataResult = {}
      for (const chatId of allChatId) {
        const selectedLoadedMsg = loadedChatMsg[chatId];
        const rawSelectedChatDataByGroup = databases.eChats.getGcById(chatId);
        const selectedChatData = (rawSelectedChatDataByGroup) ? rawSelectedChatDataByGroup : databases.eChats.getPcById(chatId);
        if (selectedChatData && (chatId.includes('-') || (selectedChatData.GroupParticipants).includes(userId) || chatId === 'Global')) {
          let filteredMsg = [];
          if (chatId.includes('-')) {
            filteredMsg = selectedChatData.filter(msg => (selectedLoadedMsg.includes(msg.Id)) ? false : true)
          } else {
            filteredMsg = (selectedChatData.Messages).filter(msg => (selectedLoadedMsg.includes(msg.Id)) ? false : true)
          }
          dataResult[chatId] = {
            Name: (chatId.includes('-')) ? chatId : selectedChatData.Name,
            LastChat: (chatId.includes('-')) ? selectedChatData[(selectedChatData).length - 1] : selectedChatData.Messages[(selectedChatData.Messages).length - 1],
            FilteredMsg: filteredMsg,
          }
        } else {
          dataResult[chatId] = {
            Name: selectedChatData.Name,
            LastChat: [{
              Id: Utility.opr.makeid(6),
              Reply: false,
              From: 'self',
              Type: 'kick',
              Body: userId,
              Time: '00.00'
            }],
            FilteredMsg: [{
              Id: Utility.opr.makeid(6),
              Reply: false,
              From: 'self',
              Type: 'kick',
              Body: userId,
              Time: '00.00'
            }]
          }
        };
      }
      res.status(200).json({
        success: true,
        message: 'Succes Get',
        data: dataResult
      })
    } else {
      res.status(403).json({
        success: false,
        message: 'Invalid Data'
      })
    }
  })

  // profile
  app.get('/user/profile/:id', (req, res) => {
    const {id} = req.params;
    res.sendFile(databases.eUsers.getPP(id));
  });
  app.get('/group/profile/:id', (req, res) => {
    const {id} = req.params;
    res.sendFile(databases.eChats.getPP(id));
  });

  /* Post Method */
  app.post('*', (req, res)=>{
    if (RequestFilter.checkRequest(req.rawHeaders)) {
      req.next();
    } else {
      res.status(429).json({
        success: false,
        message: 'You make req over limit',
      });
    }
  });
  // Enctiption
  /*
    data : string
  */
  app.post('/md5enc/:salt/', (req, res)=>{
    const {salt} = req.params;
    const {data} = req.body;
    if (salt && data) {
      res.status(200).json({
        success: true,
        message: 'Success Encrypt',
        data: Utility.md5.enc(salt, data),
      });
    } else {
      res.status(403).json({
        success: false,
        message: 'Failed Encrypt',
      });
    }
  });

  // Get Messages
  /*
    msgIdRecived : array of message id
    userId : User Id
  */

  /* Start Listen to network */
  app.listen(config.appConfig.PortUse, ()=>{
    console.log(
        chalk.cyanBright(
            `Started at port ${chalk.underline(config.appConfig.PortUse)}`,
        ),
    );
  });
};


// Checking if database ready
const checkReady = setInterval(() => {
  if (databases.getReady()) {
    clearInterval(checkReady);
    main();
  };
}, 500);

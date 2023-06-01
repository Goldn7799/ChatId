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
  app.get('/users/check/:id', (req, res)=>{
    const {id} =req.params;
    if (id && id.length > 10) {
      res.status(200).json({
        success: databases.eUsers.checkUser(id),
        message: 'None',
      });
    } else {
      res.status(403).json({
        success: false,
        message: 'Invalid Request',
      });
    }
  });

  // Chats
  app.get('/chats/metadata/:type/:id', (req, res)=>{
    const {type, id} = req.params;
    const selectedChat = (type === 'group') ?
      databases.eChats.getGcById(id) : databases.eChats.getPcById(id);
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

  app.post('/chats/message/:type/:chatId', (req, res)=>{
    const {type, chatId} = req.params;
    const {msgIdRecived, userId} = req.body;
    if (typeof(msgIdRecived) === 'object' && userId) {
      const selectedChat = (type === 'group') ?
        (databases.eChats.getGcById(chatId)) :
        (databases.eChats.getPcById(chatId));
      if (selectedChat) {
        const listOfParticipantsId =
          selectedChat.GroupParticipants.map((user) => {
            return user.id;
          });
        if (listOfParticipantsId.includes(userId)) {
          let filteredMessage = Utility.oop.copy(selectedChat.Messages);
          for (const msgId of msgIdRecived) {
            filteredMessage = filteredMessage.filter((msg) => msg.id !== msgId);
          }
          res.status(200).json({
            success: true,
            message: 'Succes Load Message List',
            data: filteredMessage,
          });
        } else {
          res.status(401).json({
            success: false,
            message: 'Acces Denied',
          });
        }
      } else {
        res.status(404).json({
          success: false,
          message: `${chatId} not found`,
        });
      }
    } else {
      res.status(403).json({
        success: false,
        message: 'Cant resolve data',
      });
    }
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

  /* Start Listen to network */
  app.listen(config.appConfig.PortUse, ()=>{
    console.log(
        chalk.cyanBright(
            `Started at port ${chalk.underline(config.appConfig.PortUse)}`,
        ),
    );
  });
};

const checkReady = setInterval(() => {
  if (databases.getReady()) {
    clearInterval(checkReady);
    main();
  };
}, 500);

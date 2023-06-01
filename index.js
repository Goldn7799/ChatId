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
      chalk.cyanBright(`Started at port ${chalk.underline(config.appConfig.PortUse)}`)
    );
  });
};

const checkReady = setInterval(() => {
  if (databases.getReady()) {
    clearInterval(checkReady);
    main();
  };
}, 500);

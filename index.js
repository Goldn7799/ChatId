const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const config = require('./Config');
const RequestFilter = require('./library/App/RequestFilter');

/* Setup Express */
const app = express();
app.use(cors({
  origin: config.appConfig.AllowedOrigin,
}));
app.use(bodyParser.json({
  limit: config.appConfig.MaxRequestMB,
}));

/* Get Method */
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

/* Start Listen to network */
app.listen(config.appConfig.PortUse, ()=>{
  console.log(`Started at port ${config.appConfig.PortUse}`)
})

const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const config = require('./Config');
const RequestFilter = require('./library/App/RequestFilter');
const Utility = require('./library/Utility/Utility');

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
    req.next()
  } else {
    res.status(429).json({
      success: false,
      message: 'You make req over limit',
    });
  }
})
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
    req.next()
  } else {
    res.status(429).json({
      success: false,
      message: 'You make req over limit',
    });
  }
})
// Enctiption
app.post('/md5enc/:salt/', (req, res)=>{
  const { salt } = req.params;
  const { data } = req.body;
  if (salt && data) {
    res.status(200).json({
      success: true,
      message: 'Success Encrypt',
      data: Utility.md5.enc(salt, data)
    })
  } else {
    res.status(403).json({
      success: false,
      message: 'Failed Encrypt'
    })
  }
})

/* Start Listen to network */
app.listen(config.appConfig.PortUse, ()=>{
  console.log(`Started at port ${config.appConfig.PortUse}`)
})

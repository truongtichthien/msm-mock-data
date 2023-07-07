const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const fs = require('fs');

/**  */
const app = express();

// define root directory for resources
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/v1/msm-web/users/:id/info', function (req, res) {
  const paramId = req.params.id;
  fs.readFile('./src/app/db/users/info.json', 'utf8', (err, data) => {
    if (err) {
      res.status(401).json({ userId: paramId, execution: false });
      return;
    }
    const usersInfo = JSON.parse(data);
    const info = usersInfo[paramId] || usersInfo['default'];
    res.json(info);
  });
});

app.use('/api/v1/msm-web/users/:id/balance', function (req, res) {
  const paramId = req.params.id;
  const queryFor = req.query.for;
  fs.readFile(`./src/app/db/users/balance/${queryFor}.json`, 'utf8', (err, data) => {
    if (err) {
      res.status(401).json({ userId: paramId, execution: false });
      return;
    }
    const usersInfo = JSON.parse(data);
    const info = usersInfo[paramId] || usersInfo['default'];
    res.json(info);
  });
});

/** Establish HTTP Connection */
const port = process.env.PORT || 4400;
app.listen(port, function () {
  console.log('API running on port ', port);
});

module.exports = app;

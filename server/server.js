// Main starting point of the application
const path = require('path');
require('dotenv').config();
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const router = require('./router');

// DB setup
mongoose.set("debug", true);
mongoose.Promise = global.Promise;
mongoose.connect(process.env.mongodburi, { useNewUrlParser: true }).then(() => { 
      console.log("mongoose connected successfully");
      startWebServer();
    },
    err => {
      console.log("mongoose did not connect", err);
     }
  );

const startWebServer = () => {
    const app = express();

    app.use(express.static("public"));
    app.use(morgan('combined'));
    app.use(cors());
    app.use(bodyParser.json({ type: '*/*' }));
    router(app);

    app.get('*', function(req, res) {
        res.sendFile(path.join(__dirname + '/public/index.html'));
    });

    // Server setup
    const port = process.env.PORT || 3090;
    const server = http.createServer(app);
    server.listen(port);
    console.log('Server listening on:', port);
}

// Main starting point of the application
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const router = require('./router');

// DB setup
mongoose.connect('mongodb://localhost:27017', { useNewUrlParser: true }).then(() => { 
      console.log("mongoose connected successfully");
     
      startWebServer();
    },
    err => {
      console.log("mongoose did not connect", err);
     }
  );;

const startWebServer = () => {
    const app = express();

    // Dev app setup
    if (app.get('env') === 'development') {
        app.use(cors());
    }
    
    // App setup
    app.use(morgan('combined'));
    app.use(bodyParser.json({ type: '*/*' }));
    app.use(bodyParser.urlencoded({ extended: false }));
    router(app);

    // Production app setup
    if (process.env.NODE_ENV === 'production') {
        app.use(express.static(path.join(__dirname, 'build')));
        app.get('*', function (req, res) {
            res.sendFile(path.join(__dirname, 'build', 'index.html'));
        });
    }

    // Error handling
    app.use(function (req, res) {
        res.status(404).send('Page not found');
    });
    app.use(function (error, req, res, next) {
        res.status(500).send(`An error has occured: ${error}`);
    });

    // Server setup
    const port = process.env.PORT || 5000;
    const server = http.createServer(app);
    server.listen(port);
    console.log('Server listening on:', port);
}

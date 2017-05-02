/* eslint consistent-return:0 */

const express = require('express');
const logger = require('./logger');

const argv = require('minimist')(process.argv.slice(2));
const setup = require('./middlewares/frontendMiddleware');
const isDev = process.env.NODE_ENV !== 'production';
const ngrok = (isDev && process.env.ENABLE_TUNNEL) || argv.tunnel ? require('ngrok') : false;
const resolve = require('path').resolve;
const app = express();
var firebase = require('firebase');


// If you need a backend, e.g. an API, add your custom backend-specific middleware here
// app.use('/api', myApi);
var config = {
    apiKey: "AIzaSyC7iVp_D4iCAOl1e6ymW9TB7aC9E8tbjD4",
    authDomain: "spatialmap-1b08e.firebaseapp.com",
    databaseURL: "https://spatialmap-1b08e.firebaseio.com",
    projectId: "spatialmap-1b08e",
    storageBucket: "spatialmap-1b08e.appspot.com",
    messagingSenderId: "370588224195"
  };

firebase.initializeApp(config);

// In production we need to pass these values in instead of relying on webpack
setup(app, {
  outputPath: resolve(process.cwd(), 'build'),
  publicPath: '/',
});

// get the intended host and port number, use localhost and port 3000 if not provided
const customHost = argv.host || process.env.HOST;
const host = customHost || null; // Let http.Server use its default IPv6/4 host
const prettyHost = customHost || 'localhost';

const port = argv.port || process.env.PORT || 3000;

// Start your app.
app.listen(port, host, (err) => {
  if (err) {
    return logger.error(err.message);
  }

  // Connect to ngrok in dev mode
  if (ngrok) {
    ngrok.connect(port, (innerErr, url) => {
      if (innerErr) {
        return logger.error(innerErr);
      }

      logger.appStarted(port, prettyHost, url);
    });
  } else {
    logger.appStarted(port, prettyHost);
  }
});

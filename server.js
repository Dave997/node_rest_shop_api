const http = require('http');
const app = require('./app')

const port = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(port);

// npm install --save-dev nodemon 
// with that package i don't have to save and restart server for each code modification 
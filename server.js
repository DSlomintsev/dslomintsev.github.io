/*const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Serve the index.html file for the root path
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html')); // Use sendFile to return the HTML file
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});*/

const https = require('https');
const fs = require('fs');
const path = require('path');
const express = require('express'); // Or use the native 'http' module

const app = express(); // Example using Express.js
// ... configure your express app (routes, middleware, etc.) ...

app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html')); // Use sendFile to return the HTML file
});

const options = {
  key: fs.readFileSync(path.join(__dirname, 'certificates/localhost-key.pem')), // use 'localhost-key.pem' if using mkcert
  cert: fs.readFileSync(path.join(__dirname, 'certificates/localhost.pem')) // use 'localhost.pem' if using mkcert
};

const PORT = 3000; // Use a high port (e.g., 3000, 8443) for local development

https.createServer(options, app).listen(PORT, () => {
  console.log(`HTTPS server running on https://localhost:${PORT}/`);
});
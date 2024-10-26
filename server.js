const http = require('http');
const app = require('./app');

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`The server is running: http://localhost:${port}`);
});
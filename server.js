const http = require('http');
const app = require('./app');

require('dotenv').config()

const port = process.env.PORT;

app.listen(port, () => {
    console.log(`The server is running: http://localhost:${port}`);
});
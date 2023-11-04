const http = require('http');
const app = require('./app');
const { mongoConnect} = require('./utils/mongo');
const { loadPlanetsData } = require('./models/planets.model');
require('dotenv').config();

const port = process.env.PORT ;

const server = http.createServer(app);


async function startServer() {
    await mongoConnect();
    await loadPlanetsData();

    server.listen(port, () => {
        console.log(`Server is running on port: ${port}`);
    });
}
startServer();

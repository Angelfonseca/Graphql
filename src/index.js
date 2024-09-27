const { ApolloServer } = require("apollo-server-express");
const mongoose = require("mongoose");
const schema = require("./Modules/index");
const http = require("http");
const bodyParser = require("body-parser");
const express = require("express");
const WebSocket = require('ws');
require("dotenv/config");
const connectToDB = require("./db/db");

const app = express();
const httpServer = http.createServer(app);

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET,HEAD,OPTIONS,POST,PUT,DELETE"
    );
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    next();
});
app.disable("x-powered-by");

app.use(bodyParser.json({ limit: "50mb" }));
app.use(
    bodyParser.urlencoded({
        limit: "50mb",
        extended: true,
        parameterLimit: 50000,
    })
);

const PORT = process.env.PORT || 5000;

const server = new ApolloServer({
    cache: "bounded",
    schema,
    context: async ({ req }) => {
        return {
            req,
        };
    },
    plugins: [
        {
            ApolloServerPluginDrainHttpServer: {
                async serverWillStart() {
                    return {
                        async drainServer() {
                            await serverCleanup.dispose();
                        },
                    };
                },
            },
        },
    ],
});

const wss = new WebSocket.Server({ server: httpServer });

wss.on('connection', (ws) => {
    console.log('New WebSocket connection');
    ws.on('message', (message) => {
        console.log('received:', message);
        ws.send('Hello Client');
    });
});

async function startApolloServer() {
    await server.start();
    server.applyMiddleware({ app });

    httpServer.listen(PORT, () => {
        console.log(
            `HTTP Server running on http://localhost:${PORT}${server.graphqlPath}`
        );
        console.log(`WebSocket server running on ws://localhost:${PORT}`);
    });
}

connectToDB().then(() => {
    console.log("Connected to MongoDB");
    startApolloServer();
});

require('dotenv').config();
const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const cors = require('cors');
const bodyParser = require('body-parser');
const routes = require('./src/routes'); // API routes
const db = require('./src/config/database'); // MySQL connection

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(cors());
app.use(bodyParser.json());
app.use('/api', routes); // API endpoints

// WebSocket connection
wss.on('connection', (ws) => {
    console.log('Client connected to WebSocket');
    ws.on('message', (message) => {
        console.log('Received:', message);
    });
    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

// Start server
const PORT = process.env.HTTP_PORT || 8122;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));



// ROUTES

const fileRoutes = require('./routes/fileRoutes');
app.use('/api/files', fileRoutes);

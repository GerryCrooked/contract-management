require('dotenv').config();
const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const cors = require('cors');
const bodyParser = require('body-parser');
const routes = require('./routes/fileRoutes'); // ✅ Corrected path
const db = require('./config/database'); // ✅ Ensure database connection is initialized

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(cors());
app.use(bodyParser.json());
app.use('/api/files', routes); // ✅ Ensure correct route mounting

// WebSocket connection
wss.on('connection', (ws) => {
    console.log('✅ WebSocket Client Connected');
    ws.on('message', (message) => {
        console.log('📩 Received:', message);
    });
    ws.on('close', () => {
        console.log('❌ WebSocket Client Disconnected');
    });
});

// Start server
const PORT = process.env.HTTP_PORT || 8122;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

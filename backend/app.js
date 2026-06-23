require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fileRoutes = require('./routes/fileRoutes');
const contractRoutes = require('./routes/contractRoutes');
const db = require('./config/database');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/api/files', fileRoutes);
app.use('/api/contracts', contractRoutes);

// 🚀 Test API Endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: "ok" });
});

// Initialize DB Connection
db.authenticate()
    .then(() => console.log('✅ Database connected'))
    .catch(err => console.error('❌ Database connection failed:', err));

module.exports = app;

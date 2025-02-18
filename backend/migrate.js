require('dotenv').config();
const db = require('./config/database');
const User = require('./models/User');
const Contract = require('./models/Contract');
const AuditLog = require('./models/AuditLog');

const migrate = async () => {
    try {
        await db.authenticate();
        console.log("✅ Connected to database!");

        // Sync tables
        await db.sync({ alter: true }); // Adjust schema if needed
        console.log("✅ Database synced successfully!");

        process.exit(0);
    } catch (error) {
        console.error("❌ Migration failed:", error);
        process.exit(1);
    }
};

migrate();

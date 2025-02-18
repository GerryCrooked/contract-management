const { DataTypes } = require('sequelize');
const db = require('../config/database');
const User = require('./User');

const AuditLog = db.define('AuditLog', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    action: { type: DataTypes.STRING, allowNull: false },
    details: { type: DataTypes.TEXT, allowNull: true },
    timestamp: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, {
    timestamps: false
});

AuditLog.belongsTo(User, { foreignKey: 'user_id' });

module.exports = AuditLog;

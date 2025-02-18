const { DataTypes } = require('sequelize');
const db = require('../config/database');

const User = db.define('User', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password_hash: { type: DataTypes.STRING, allowNull: false },
    role: { 
        type: DataTypes.ENUM('employee', 'contract_manager', 'cfo', 'admin', 'auditor'), 
        allowNull: false 
    },
    supervisor_id: { type: DataTypes.INTEGER, allowNull: true }
}, {
    timestamps: true
});

module.exports = User;

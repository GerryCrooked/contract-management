const { DataTypes } = require('sequelize');
const db = require('../config/database');
const User = require('./User');

const Contract = db.define('Contract', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: true },
    start_date: { type: DataTypes.DATE, allowNull: false },
    duration: { type: DataTypes.INTEGER, allowNull: false }, // in months
    termination_notice: { type: DataTypes.INTEGER, allowNull: false }, // in days
    cost: { type: DataTypes.DECIMAL(10,2), allowNull: false },
    contract_status: { 
        type: DataTypes.ENUM('active', 'pending_approval', 'archived'), 
        defaultValue: 'active' 
    },
    owner_id: { type: DataTypes.INTEGER, allowNull: false },
    assigned_to: { type: DataTypes.INTEGER, allowNull: true }
}, {
    timestamps: true
});

Contract.belongsTo(User, { foreignKey: 'owner_id' });
Contract.belongsTo(User, { foreignKey: 'assigned_to', as: 'AssignedUser' });

module.exports = Contract;

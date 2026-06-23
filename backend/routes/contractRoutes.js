const express = require('express');
const Contract = require('../models/Contract');
const router = express.Router();

// GET all contracts
router.get('/', async (req, res) => {
    try {
        const contracts = await Contract.findAll();
        res.json(contracts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET a single contract
router.get('/:id', async (req, res) => {
    try {
        const contract = await Contract.findByPk(req.params.id);
        if (!contract) return res.status(404).json({ error: "Contract not found" });
        res.json(contract);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST a new contract
router.post('/', async (req, res) => {
    try {
        const newContract = await Contract.create(req.body);
        res.status(201).json(newContract);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// PUT (update) a contract
router.put('/:id', async (req, res) => {
    try {
        const contract = await Contract.findByPk(req.params.id);
        if (!contract) return res.status(404).json({ error: "Contract not found" });

        await contract.update(req.body);
        res.json(contract);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// DELETE a contract
router.delete('/:id', async (req, res) => {
    try {
        const contract = await Contract.findByPk(req.params.id);
        if (!contract) return res.status(404).json({ error: "Contract not found" });

        await contract.destroy();
        res.json({ message: "Contract deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;

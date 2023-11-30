const express = require('express');
const teamController = require('../controllers/teamController');

const router = express.Router();

// Create a new team
router.post('/api/team', teamController.createTeam);

// Retrieve team details by ID
router.get('/api/team/:id', teamController.getTeamById);

module.exports = router;

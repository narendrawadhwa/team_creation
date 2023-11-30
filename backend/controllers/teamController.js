const Team = require('../models/Team');
const User = require('../models/User');

const teamController = {
  //Creating team 
    createTeam: async (req, res) => {
        try {
          const teamData = req.body;
    
          if (!teamData.members || !Array.isArray(teamData.members)) {
            return res.status(400).json({ message: 'Invalid or missing members array' });
          }
    
          // Checking if team members have different domains or not
          const memberDomains = new Set();
    
          for (const member of teamData.members) {
            if (!member || !member.user_id) {
              return res.status(400).json({ message: 'Invalid member data' });
            }
    
            const user = await User.findById(member.user_id);
    
            if (!user) {
              return res.status(400).json({ message: `User not found with ID ${member.user_id}` });
            }
            // Checking if users getting added to team are available or not 
            if (!user.available) {
              return res.status(400).json({ message: `${user.first_name} is not available` });
            }
    
            if (memberDomains.has(user.domain)) {
              return res.status(400).json({ message: 'Team members must have different domains' });
            }

              // After satisfying all above conditions, adding user to team
            memberDomains.add(user.domain);
          }
    
          // Creating the team
          const newTeam = new Team(teamData);
          await newTeam.save();
    
          res.status(201).json(newTeam);
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: 'Internal server error' });
        }
      },
    
// Getting team by id
  getTeamById: async (req, res) => {
    try {
      const teamId = req.params.id;
      const team = await Team.findById(teamId).populate('members.user_id');

      if (!team) {
        return res.status(404).json({ message: 'Team not found' });
      }

      res.json(team);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },



};

module.exports = teamController;

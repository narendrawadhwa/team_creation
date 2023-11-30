const mongoose = require('mongoose');
const User = require('../models/User');
const { Types: { ObjectId } } = mongoose;

const userController = {
  //Display all the users with filteration, searching and pagination
  getAllUsers: async (req, res) => {
    try {
      const pageSize = 20;
      let { page, domain, gender, availability, search } = req.query;
      page = parseInt(page) || 1;

      let query = {};

      // Apply filters
      if (domain) {
        query.domain = { $in: domain.split(',') };
      }

      if (gender) {
        query.gender = { $in: gender.split(',') };
      }

      if (availability) {
        query.available = { $in: availability.split(',') };
      }

      // Apply searching
      if (search) {
        query.$or = [
          { first_name: { $regex: search, $options: 'i' } },
          { last_name: { $regex: search, $options: 'i' } },
        ];
      }
      //Pagination
      const totalUsers = await User.countDocuments(query);
      const totalPages = Math.ceil(totalUsers / pageSize);

      const skip = (page - 1) * pageSize;

      // Find users based on query, skip, and limit
      const users = await User.find(query).skip(skip).limit(pageSize);

      res.json({
        users,
        currentPage: page,
        totalPages,
      });

      console.log('Request received for getAllUsers');
      console.log('Retrieved users:', users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  //Getting user by id
  getUserById: async (req, res) => {
    try {
      const userId = req.params.id;

      //Check if the ID is a valid ObjectId (MongoDB) or not
      const isValidObjectId = /^[0-9a-fA-F]{24}$/.test(userId);

      const userQuery = isValidObjectId ? { _id: userId } : { id: userId };
      const user = await User.findOne(userQuery);

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },



  //Create new user
  createUser: async (req, res) => {
    try {
      const { email } = req.body;

      // Check if the email already exists
      const existingUser = await User.findOne({ email });

      if (existingUser) {
        return res.status(400).json({ message: 'Email already exists' });
      }

      // Create and save the new user
      const newUser = new User(req.body);
      await newUser.save();

      res.status(201).json(newUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },


  //Update User By Id
  updateUserById: async (req, res) => {
    try {
      const userId = req.params.id;

      //Check if the ID is a valid ObjectId (MongoDB) or not
      const isValidObjectId = /^[0-9a-fA-F]{24}$/.test(userId);

      const userQuery = isValidObjectId ? { _id: userId } : { id: userId };
      const updatedUser = await User.findOneAndUpdate(userQuery, req.body, {
        new: true,
      });

      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.json(updatedUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },



//Delete user by Id
  deleteUserById: async (req, res) => {
    try {
      const userId = req.params.id;
      const deletedUser = await User.findByIdAndDelete(userId);

      if (!deletedUser) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.json(deletedUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },
};

module.exports = userController;

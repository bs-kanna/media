const express = require('express');
const User = require('../models/User');
const router = express.Router();
const sendEmail = require('./mail');


// Follow a user
router.post('/:userId/follow', async (req, res) => {
    const { followerId } = req.body;
    const { userId } = req.params;

    try {
        const userToFollow = await User.findById(userId);
        const followerUser = await User.findById(followerId);

        if (!userToFollow || !followerUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (userToFollow.followers.includes(followerId)) {
            return res.status(400).json({ message: 'Already following this user' });
        }

        userToFollow.followers.push(followerId);
        followerUser.following.push(userId);

        await userToFollow.save();
        await followerUser.save();
        await sendEmail(
            userToFollow.email, 
            'New Follower!', 
            `${followerUser.username} has started following you.`
          );


        res.json(userToFollow);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Unfollow a user
router.delete('/:userId/unfollow', async (req, res) => {
    const { followerId } = req.body;
    const { userId } = req.params;

    try {
        const userToUnfollow = await User.findById(userId);
        const followerUser = await User.findById(followerId);

        if (!userToUnfollow || !followerUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (!userToUnfollow.followers.includes(followerId)) {
            return res.status(400).json({ message: 'You are not following' });
        }

        userToUnfollow.followers = userToUnfollow.followers.filter(id => id.toString() !== followerId);
        followerUser.following = followerUser.following.filter(id => id.toString() !== userId);

        await userToUnfollow.save();
        await followerUser.save();


        res.json(userToUnfollow);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;

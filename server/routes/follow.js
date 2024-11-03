// routes/follow.js

const express = require('express');
const User = require('../models/User');
const router = express.Router();

// Follow a user
router.post('/:id/follow', async (req, res) => {
    const { userId } = req.body; // Expecting userId in the request body
    const { id } = req.params; // The user to follow

    try {
        const userToFollow = await User.findById(id);
        const follower = await User.findById(userId);
        if (!userToFollow || !follower) return res.status(404).json({ message: 'User not found' });

        // Check if already following
        if (follower.following.includes(userToFollow._id)) {
            return res.status(400).json({ message: 'You are already following this user' });
        }

        // Add to following and followers
        follower.following.push(userToFollow._id);
        userToFollow.followers.push(follower._id);

        await follower.save();
        await userToFollow.save();
        res.json({ message: 'Followed successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Unfollow a user
router.post('/:id/unfollow', async (req, res) => {
    const { userId } = req.body; // Expecting userId in the request body
    const { id } = req.params; // The user to unfollow

    try {
        const userToUnfollow = await User.findById(id);
        const follower = await User.findById(userId);
        if (!userToUnfollow || !follower) return res.status(404).json({ message: 'User not found' });

        // Check if not following
        if (!follower.following.includes(userToUnfollow._id)) {
            return res.status(400).json({ message: 'You are not following this user' });
        }

        // Remove from following and followers
        follower.following = follower.following.filter(id => id.toString() !== userToUnfollow._id.toString());
        userToUnfollow.followers = userToUnfollow.followers.filter(id => id.toString() !== follower._id.toString());

        await follower.save();
        await userToUnfollow.save();
        res.json({ message: 'Unfollowed successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;

// routes/likes.js

const express = require('express');
const Post = require('../models/Post');
const User = require('../models/User');
const router = express.Router();

// Like a post
router.post('/:postId/like', async (req, res) => {
    const { userId } = req.body; // Expecting userId in the request body
    const { postId } = req.params;

    try {
        const post = await Post.findById(postId);
        if (!post) return res.status(404).json({ message: 'Post not found' });

        // Check if user already liked the post
        if (post.likes.includes(userId)) {
            // If already liked, remove the like
            post.likes = post.likes.filter(id => id.toString() !== userId);
        } else {
            // If not liked, add the like
            post.likes.push(userId);
        }

        await post.save();
        res.json(post);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;

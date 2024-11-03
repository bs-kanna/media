// routes/posts.js

const express = require('express');
const Post = require('../models/Post');
const Comment = require('../models/Comment');
const User = require('../models/User');
const router = express.Router();

// Create a new post
router.post('/', async (req, res) => {
    const { userId, postContent } = req.body;

    try {
        const newPost = new Post({ userId, postContent });
        await newPost.save();

        // Add post to user's posts array
        const user = await User.findById(userId);
        user.posts.push(newPost._id);
        await user.save();

        res.status(201).json(newPost);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Create a new comment
router.post('/:postId/comments', async (req, res) => {
    const { userId, commentText } = req.body;
    const { postId } = req.params;

    try {
        const newComment = new Comment({ userId, commentText, postId });
        await newComment.save();

        // Add comment to the post's comments array
        const post = await Post.findById(postId);
        post.comments.push(newComment._id);
        await post.save();

        res.status(201).json(newComment);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Get all comments for a specific post
router.get('/:postId/comments', async (req, res) => {
    const { postId } = req.params;

    try {
        const comments = await Comment.find({ postId }).populate('userId', 'username');
        res.json(comments);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Update a comment
router.put('/comments/:commentId', async (req, res) => {
    const { commentId } = req.params;
    const { commentText } = req.body;

    try {
        const updatedComment = await Comment.findByIdAndUpdate(commentId, { commentText }, { new: true });
        if (!updatedComment) return res.status(404).json({ message: 'Comment not found' });

        res.json(updatedComment);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Delete a comment
router.delete('/comments/:commentId', async (req, res) => {
    const { commentId } = req.params;

    try {
        const deletedComment = await Comment.findByIdAndDelete(commentId);
        if (!deletedComment) return res.status(404).json({ message: 'Comment not found' });

        // Optionally, you can also remove the comment ID from the related post
        await Post.findByIdAndUpdate(deletedComment.postId, { $pull: { comments: commentId } });

        res.json({ message: 'Comment deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;

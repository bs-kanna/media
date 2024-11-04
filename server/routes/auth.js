const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const sendEmail = require('./mail');

// User Registration

router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
        await sendEmail(
            newUser.email, 
            'Welcome..!', 
            `${newUser.username} has Created your account successfully...`
          );

    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// User login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        res.json({ token, userId: user._id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;


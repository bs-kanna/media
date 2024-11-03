
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config(); 

const app = express();
const PORT = process.env.PORT || 5000;

const User = require('./models/User');
const Post = require('./models/Post');
const Comment = require('./models/Comment');
const likesRouter = require('./routes/likes');
const followRouter = require('./routes/follow');
const authRouter = require('./routes/auth');
const postsRouter = require('./routes/posts');

app.use(express.json()); 

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error('MongoDB connection error:', err));

// Simple route
app.get('/', (req, res) => {
    res.send('API is running...');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

//Routes
app.use('/api/likes', likesRouter);
app.use('/api/follow', followRouter);
app.use('/api/auth', authRouter);
app.use('/api/posts', postsRouter);
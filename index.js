const express = require('express');
const dotenv = require('dotenv')
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/user.routes')
const topicRoutes = require('./routes/topic.routes')
const youtubeRoutes = require('./routes/youtube.routes')
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use('/auth',authRoutes);
app.use('/topics',topicRoutes);
app.use('/youtube',youtubeRoutes);

const PORT = process.env.PORT || 5000

mongoose.connect(process.env.MONGO_URL)
.then(()=> console.log('Connected to Database Successfully'))
.catch((error) => console.log('Error Connecting to DB: ' , error));


app.listen(PORT , ()=>{
    console.log(`Server is Running on http://localhost:${PORT}`);
    
})
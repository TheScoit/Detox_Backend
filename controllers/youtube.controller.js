const express = require('express')
const axios = require('axios')

const User = require('../models/User.js')
const getVideos = async(req,res)=>{
    const userId = req.userId;

    try {
        const user =await User.findById(userId);

        if(!user){
            return res.status(404).json({
                message: "User not found"
            })
        }

    
        const videoResults = [];

        for(const topic of user.selectedTopics){
            const response = await axios.get(`https://www.googleapis.com/youtube/v3/search`,{
                params:{
                   q:topic,
                   part: 'snippet',
                   type:'video',
                   maxResults : 15,
                   key: process.env.YOUTUBE_API_KEY 
                }
            });

            videoResults.push(...response.data.items);
            
        }

        // const response = await axios.get(`https://www.googleapis.com/youtube/v3/search?${topicQueries}&part=snippet&type=video&key=${process.env.YOUTUBE_API_KEY}`)
        res.status(200).json(videoResults);
        
    } catch (error) {
        res.status(500).json({
            message:"Something went wrong"
        })
        
    }
}

module.exports = {getVideos}
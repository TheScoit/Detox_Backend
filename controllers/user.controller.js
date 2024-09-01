const User = require('../models/User.js')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signup = async(req,res) =>{
    const { email, password } = req.body;
    try {
        const existingUser = await User.findOne({email });
        if(existingUser){
            return res.status(400).json({
                message:"User Already Exist"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const result = await User.create({
            email,
            password: hashedPassword
        });

        const token = jwt.sign({
            email: result.email,
            id: result._id
        }, 'secret' , {expiresIn: '1h'});
        res.status(201).json({
            result,
            token
        });
    } catch (error) {
            res.status(500).json({
                message:'Something went wrong'
            });
    }
}

const login = async(req,res) =>{
    const { email, password } = req.body;

    try {
        const existingUser = await User.findOne({email });
        if(!existingUser){
            return res.status(404).json({
                message:"User Not Found"
            })
        }

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if(!isPasswordCorrect){
            return res.status(400).json({
                message: 'Invalid Credentials'
            });
        }
        
        const token = jwt.sign({
            email: existingUser.email,
            id: existingUser._id
        }, 'secret' , {expiresIn: '1h'});
        res.status(201).json({
            result : existingUser,
            token
        });
    } catch (error) {
            res.status(500).json({
                message:'Something went wrong'
            });
    }
}

module.exports = {signup, login}
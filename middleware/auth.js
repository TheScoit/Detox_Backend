const jwt = require('jsonwebtoken')
const auth = (req,res,next) =>{
    try {
        const token = req.headers.authorization.split(' ')[1];

        if(!token){
            return res.status(401).json({
                message:  'Auth Failed'
            });
        }

        const decodeData = jwt.verify(token , 'secret');
        req.userId = decodeData?.id;
        next();
    } catch (error) {
        res.status(401).json({
            message: 'Auth Failed'
        });
    }
}
 
module.exports = auth;
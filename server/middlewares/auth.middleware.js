import jwt from 'jsonwebtoken';
import { userModel } from '../models/users.model.js';

const authMiddleware = async (req,res,next) =>{
    try {
        let token = req.headers["jwt"] || req.cookies["jwt"];
        if(!token){
            return res.status(401).json({message: 'user not logged in'});
        }
        let decoded = jwt.verify(token,process.env.JWT_SECRET)
        if(!decoded){
            return res.status(400).json({message: 'invalid token'});
        }
        let user = await userModel.findById({userId: decoded.userId})
        req.user = user;
        next() 
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}
export default authMiddleware;
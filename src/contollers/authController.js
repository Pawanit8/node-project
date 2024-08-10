require('dotenv').config()

const Jwt = require('../jwt/auth')

class AuthController {
    
    generateToken = async(req,res) =>{
        const {id,name,email,role} = req.body;
        const payload = {
            id,name,email,role
        }
        const options = {
            expiresIn: process.env.TOKEN_EXPIRE_TIME // Token will expire in 1 hour
          };
        const token= await Jwt.tokenSignIn(payload,process.env.JWT_SECRET,options);
        console.log("🚀 ~ AuthController ~ generateToken=async ~ token:", token)
        if(!token){
            res.send({code:500,msg:'token not generated successfully'})
        }
        res.send({code:200,token:token,msg:'token generated successfully'})
    }

    getUserProfile = async(req,res)=>{
        res.send({code:200,data:{},msg:'user data'})
    }
}

module.exports = new AuthController;
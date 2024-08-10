const jwt = require('jsonwebtoken')
require('dotenv').config()

class JwtClass {
     tokenSignIn = (payload,secret,options) => {
        // token generate process//
       const token= jwt.sign(payload,secret,options);
        return token
    };

    tokenVerify= (req,res,next) =>{
        const token = req.headers['token'];
        console.log("🚀 ~ JwtClass ~ token:", token)
        jwt.verify(token,process.env.JWT_SECRET,(err,data) => {
            console.log("🚀 ~ JwtClass ~ jwt.verify ~ data:", data)
            req.data=data
       
         	if(err) res.send({code:401,msg:'Invalid Token'})
         	next()
      	
        })
    }
}

module.exports = new JwtClass;
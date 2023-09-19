const jwt= require('jsonwebtoken');   
const jwtsignature= 'NijanshuToken'; 

const fetchUser=(req, res,next)=>{
    // Get the user from thejwt token and add ID to req object
    const token=req.header('auth-token');
    if(!token){
        res.status(401).send({error:"Not a valid token"});
        
    }
    try{
    const data= jwt.verify(token, jwtsignature);
    req.user= data.user;
    next();
    }catch(err){
        res.status(401).send({error:"Not a valid token"});
    }
}

module.exports= fetchUser
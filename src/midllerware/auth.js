const jwt = require("jsonwebtoken");



const authenticate= async function(req,res,next){
    try{
        
    const token= req.headers["x-api-key"]
    const data  = req.params
    const user = data.userId
    
    if(!token){
        res.status(400).send({status:false,msg:"Please enter token"})
    }
    let decodedtoken = jwt.verify(token,"abhinav") //authentication

    

    let userId = decodedtoken.userId

    if(user){
       if(user != userId) return res.status(400).send({status : false, msg : "UserId does not match!"})
    }
    
     if(!decodedtoken){
       return  res.status(401).send({status:false, msg:"invalid token"})
     }
     next()
    }
    catch(error){
      return  res.status(500).send({status:false ,message:error})
    }
}


module.exports.authenticate=authenticate

const jwt = require("jsonwebtoken");
const { ADMIN_SECRET } = process.env;


const authorizeAdmin = async(req, res, next)=>{
    console.log(req.headers);
    const authHeaders = req.headers.authorization;
    const { token } = req.headers;
    try{
        const userContext = jwt.verify(token, ADMIN_SECRET);
        if(userContext) {
            next();
        };
        return
    }catch(err){
        console.log(err);
        next();
    }
   

    next();
}

module.exports = {authorizeAdmin};
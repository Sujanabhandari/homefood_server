const jwt = require("jsonwebtoken");

const authorizeAdmin = async(req, res, next)=>{
    // console.log(req.headers);
    const authHeaders = req.headers.authorization;

    const { token } = req.headers;
    
    if (!authHeaders)
    return res.status(401).send("Access denied. No token provided.");

    try{
        //It gets the token and decodes the information
        const userContext = jwt.verify(authHeaders, process.env.SECRET_KEY);
        console.log(userContext)

        if(userContext) {
            req.user = userContext;
            next();
        };
        return res.status(403).send("Not Authorized");
    }catch(err){
        console.log(err);
        next();
    }
   

    next();
}

module.exports = {authorizeAdmin};
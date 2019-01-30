require('dotenv').config();
const SuperAuth = (req,res,next)=>{
    const token = req.header("Authorization");
    if (token === process.env.MASTER_SECRET){
         return next();
        }
    else if (!req.user.isSuperAdmin) {
        return res.status(403).send("not allowd only super");
    }
    next();
}
exports.SuperAuth=SuperAuth;
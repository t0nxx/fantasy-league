const jwt = require('jsonwebtoken');
require('dotenv').config();
const AdminAuth = async(req,res,next)=>{
    if (!process.env.EnableAuth) return next(); // disable auth in dev
    const token = req.header("Authorization");
    if (!token) {return res.status(401).send("access denied no token");} 
    else if (token === process.env.MASTER_SECRET){ next();}  /// master key for all
    else try {
            const decode = await jwt.verify(token,process.env.JWT_SECRET_ADMIN);
            req.user = decode ;
            next();
        } catch (error) {
            res.status(400).send("invalid / expired token");
        }  
}
exports.AdminAuth=AdminAuth;
/* test
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTQ4ODg1MTY3fQ.3rESR_m1Bf6q3ZnRLz5mCMH8_3SKOcAeXZxv2c7W_eQ
*/
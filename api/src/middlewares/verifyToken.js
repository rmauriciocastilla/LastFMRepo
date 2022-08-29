const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
dotenv.config();

const verifyToken = async (req, res, next)=>{
    try {
        const headerToken = req.get('Authorization');
        if(!headerToken){
            return res.send('Token no encontrado');
        }
        const token = headerToken.replace("Bearer ", "");
        try {
            const decoded = jwt.verify(token,process.env.JWT_SECRET);
            req.user_id = decoded.user_id;
            next();
        } catch (error) {
            console.log(error);
            return res.json({role:'invalid'});    
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send('Intentelo mas tarde')    
    }
}

module.exports = verifyToken;
const {User} = require('../../db');

const isUser = async (req,res)=>{
    try{
        const user = await User.findByPk(req.user_id)
        if(user){
            return res.json({role: user.role})
        }else{
            return res.json({role:'invalid'})
        }
    }
    catch(error){
        console.log(error);
        return res.json({error:'Intentelo mas tarde'})
    }
}

module.exports = isUser;
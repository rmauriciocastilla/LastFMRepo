const dotenv = require('dotenv');
const {User} = require('../../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
dotenv.config()

const registerUser = async (req,res,next)=>{
    try {
        const {username, password, role} = req.body;
        
        if(!username || !password){
            return res.json({error:'Todos los datos son obligatorios'});
        }
        
        const myuser = await User.findOne({where: {username:username}})
        
        if(myuser){
            return res.json({error:'El email ya existe'});
        }

        const hashedPass = await bcrypt.hash(password,Number(process.env.SALT_ROUNDS))
        
        await User.create({
            username: username,
            password: hashedPass,
            role:role?role:'user'
        })
        return res.json('Usuario creado exitosamente')
    } catch (error) {
       console.log(error)
       return res.json({error: 'Ha ocurrido un problema, por favor, intentalo mas tarde'})
    }
}

const loginUser = async (req,res,next)=>{
    try {
        const {username, password} = req.body;
        if(!username || !password){
            return res.json({error: 'El email y contraseña son requeridos'});
        }
        const user = await User.findOne({where:{username:username}})
        if(!user){
            return res.json({error: 'No te encuentras registrado, crea una cuenta.'});
        }
        const comparePass = await bcrypt.compare(password,user.password);
        if(!comparePass){
            return res.json({error: 'Email o contraseña incorrectos'})
        }

        const token = jwt.sign({user_id:user.id},process.env.JWT_SECRET)
        return res.json({token});
    } catch (error) {
        
    }
}

module.exports = {registerUser, loginUser}
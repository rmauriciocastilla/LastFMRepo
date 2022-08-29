const {User,Compra} = require('../db');

const postCompra = async(req,res)=>{
    try {
        const user = await User.findByPk(req.user_id);
        const {artist,track} = req.body;
        if(!user) return res.json({error:'Usuario inexistente'})
        if(!artist || !track) return res.json({error: 'Datos de compra incompletos'})
        const compra = await Compra.findOne({
            where:{
                user_id:user.id,
                artist,
                track,
            }
        })
        if(compra) return res.json({error: 'La cancion ya se encuentra comprada'});
        const newCompra = await Compra.create({
            user_id: user.id,
            artist,
            track
        })
        return res.json('La cancion fue comprada correctamente');
    } catch (error) {
        console.log(error);
        return res.status(500).send('Intentelo mas tarde') 
    }
}

const getCompras = async(req,res)=>{
    try {
        const user = await User.findByPk(req.user_id);
        if(!user) return res.json({error:'Usuario inexistente'})
        if(user.role==='admin'){
            const compras = await Compra.findAll();
            return res.json(compras.length?compras:'No hay compras registradas')
        }
        const compras = await Compra.findAll({
            where:{
                user_id:user.id
            }
        })
        return res.json(compras.length?compras:'No hay compras registradas')
    } catch (error) {
        console.log(error);
        return res.status(500).send('Intentelo mas tarde') 
    }
}

const getAllCompras = async(req,res)=>{
    try {
        const user = await User.findByPk(req.user_id);
        if(!user) return res.json({error:'Usuario inexistente'})
        if(!user.role==='admin') return res.json({error: 'No tiene permisos'})
        const compras = await Compra.findAll()
        return res.json(compras.length?compras:'No hay compras registradas')
    } catch (error) {
        console.log(error);
        return res.status(500).send('Intentelo mas tarde') 
    }
}

const putCompra = async(req,res)=>{
    try {
        const {id,status} = req.body;
        const user = await User.findByPk(req.user_id);
        if(!user) return res.json({error:'Usuario inexistente'})
        if(!user.role==='admin') return res.json({error: 'No tiene permisos'})
        const compra = await Compra.findByPk(id);
        if(!compra) return res.json({error:'La compra no existe'});
        await Compra.update({
            status,
        },{
            where:{
                id
            }
        })
        return res.json('La compra fue actualizada correctamente')
    } catch (error) {
        console.log(error);
        return res.status(500).send('Intentelo mas tarde') 
    }
}

module.exports={
    postCompra,
    getCompras,
    getAllCompras,
    putCompra
};
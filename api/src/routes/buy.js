const {Router} = require('express');
const buyController = require('../controllers/Buy');
const verifyToken = require('../middlewares/verifyToken');

const router = Router()

router.get('/admin',[verifyToken],buyController.getAllCompras);//OBTENER TODAS LAS COMPRA
router.get('/',[verifyToken],buyController.getCompras);//OBTENER MIS COMPRAS
router.put('/',[verifyToken],buyController.putCompra);//ACEPTAR/RECHAZAR UNA COMPRA
router.post('/',[verifyToken],buyController.postCompra);//COMPRAR

module.exports = router;
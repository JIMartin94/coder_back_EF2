import { Router } from 'express';
import { carritosDao } from '../daos/carritos/index.js'
import { productosDao } from '../daos/productos/index.js'

const carritosRouter  = Router()

carritosRouter.get('/', async (req, res) => {
    const productos = await carritosDao.listarAll();
    res.json(productos)
})

carritosRouter.get('/:id', async (req, res) => {
    const productos = await carritosDao.listar(req.params.id);
    res.json(productos)
})

carritosRouter.get('/:idcarrito/productos', async (req, res) => {
    const carrito = await carritosDao.listar(req.params.idcarrito);
    res.json(carrito.productos)
})

carritosRouter.post('/', async (req, res) => {
    let cart = {date: Date.now(),productos: []}
    const prodAgregado = await carritosDao.guardar(cart);
    res.json(prodAgregado)
})

carritosRouter.put('/:idcarrito/productos', async (req, res) => {
    const productos = await productosDao.listar(req.body.id);
    const cart = await carritosDao.listar(req.params.idcarrito);
    const cartActualizado = await carritosDao.actualizar({productos: [productos,...cart.productos]},req.params.idcarrito);
    res.json(cartActualizado)
})


carritosRouter.delete('/:id', async (req, res) => {
    const prodEliminado = await carritosDao.borrar(req.params.id);
    res.json(prodEliminado)
})

carritosRouter.delete('/:idCarrito/productos/:id_prod', async (req, res) => {
    let idProd = Number(req.params.id_prod)
    const cart = await carritosDao.listar(req.params.idCarrito);
    let prodIndex = cart.productos.findIndex(p=> p.id == idProd);
    cart.productos.splice(prodIndex,1);
    const cartActualizado = await carritosDao.actualizar({productos: cart.productos},req.params.idCarrito);
    res.json(cartActualizado)
})

export { carritosRouter }
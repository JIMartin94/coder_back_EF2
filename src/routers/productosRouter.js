import { Router } from 'express';
import { productosDao } from '../daos/productos/index.js'

const productosRouter  = Router()

productosRouter.get('/', async (req, res) => {
    const productos = await productosDao.listarAll();
    res.json(productos)
})

productosRouter.get('/:id', async (req, res) => {
    const productos = await productosDao.listar(req.params.id);
    res.json(productos)
})

productosRouter.post('/', async (req, res) => {
    const prodAgregado = await productosDao.guardar(req.body);
    res.json(prodAgregado)
})

productosRouter.put('/:id', async (req, res) => {
    const prodActualizado = await productosDao.actualizar(req.body,req.params.id);
    res.json(prodActualizado)
})

productosRouter.delete('/:id', async (req, res) => {
    const prodEliminado = await productosDao.borrar(req.params.id);
    res.json(prodEliminado)
})

export { productosRouter }
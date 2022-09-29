import mongoose from 'mongoose'
import config from '../config.js'

await mongoose.connect(config.mongodb.cnxStr, config.mongodb.options)

class ContenedorMongoDb {

    constructor(nombreColeccion, esquema) {
        this.coleccion = mongoose.model(nombreColeccion, mongoose.Schema( esquema))
    }

    async listar(id) {
        let idProd = Number(id);
        let prod = await this.coleccion.findOne({id: idProd}).select({_id: 0,__v:0}).lean();
        return prod 
    }

    async listarAll() {
        let prod = await this.coleccion.find().select({_id: 0,__v:0}).lean();
        return prod
    }

    async guardar(nuevoElem) {
        let prod = new this.coleccion({id: new Date(),...nuevoElem});
         await prod.save();
    }

    async actualizar(nuevoElem,id) {
        let idProd = Number(id);
        await this.coleccion.updateOne({id: idProd},{$set: {...nuevoElem}});
    }

    async borrar(id) {
        let idProd = Number(id);
        await this.coleccion.deleteOne({id: idProd})
    }

    async borrarAll() {
        // await this.coleccion.deleteMany({});
    }
}

export default ContenedorMongoDb
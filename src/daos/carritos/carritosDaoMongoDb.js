import ContenedorMongoDb from "../../contenedores/ContenedorMongoDb.js"

class CarritosDaoMongoDb extends ContenedorMongoDb {

    constructor() {
        super('carritos', {
            id: { type: Number, required: true },
            date: { type: Date, required: true },
            productos: { type: [], required: true },
        })
    }
}

export default CarritosDaoMongoDb
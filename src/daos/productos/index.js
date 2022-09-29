import config from '../../config.js'

let productosDao

// switch (process.env.PERS) {
switch ('mongodb') {
    case 'json':
        const { default: PersonasDaoArchivo } = await import('./PersonasDaoArchivo.js')
        productosDao = new PersonasDaoArchivo(config.fileSystem.path)
        break
    case 'firebase':
        const { default: ProductosDaoFirebase } = await import('./ProductosDaoFirebase.js')
        productosDao = new ProductosDaoFirebase()
        break
    case 'mongodb':
        const { default: ProductosDaoMongoDb } = await import('./ProductosDaoMongoDb.js')
        productosDao = new ProductosDaoMongoDb()
        break
    default:
        const { default: PersonasDaoMem } = await import('./PersonasDaoMem.js')
        productosDao = new PersonasDaoMem()
        break
}

export { productosDao }
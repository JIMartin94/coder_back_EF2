import config from '../../config.js'

let carritosDao

// switch (process.env.PERS) {
switch ('mongodb') {
    case 'json':
        const { default: PersonasDaoArchivo } = await import('./PersonasDaoArchivo.js')
        carritosDao = new PersonasDaoArchivo(config.fileSystem.path)
        break
    case 'firebase':
        const { default: CarritosDaoFirebase } = await import('./CarritosDaoFirebase.js')
        carritosDao = new CarritosDaoFirebase()
        break
    case 'mongodb':
        const { default: CarritosDaoMongoDb } = await import('./CarritosDaoMongoDb.js')
        carritosDao = new CarritosDaoMongoDb()
        break
    default:
        const { default: PersonasDaoMem } = await import('./PersonasDaoMem.js')
        carritosDao = new PersonasDaoMem()
        break
}

export { carritosDao }
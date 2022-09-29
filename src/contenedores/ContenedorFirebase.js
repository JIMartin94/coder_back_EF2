import admin from "firebase-admin"
import fs from 'fs';

const rutaCredenciales = './firebase/coder-back-2ep-firebase-adminsdk-xrx8v-8f3c7e26fa.json'
const serviceAccount = JSON.parse(await fs.promises.readFile(rutaCredenciales));

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
})

const db = admin.firestore();

class ContenedorFirebase {

    constructor(nombreColeccion) {
        this.coleccion = db.collection(nombreColeccion)
    }

    async listar(id) {
        let productos = await this.listarAll();
        let p = productos.find(p =>{
            if(p.id== id){
                return p;
            }
        })
        return p
    }

    async listarAll() {
        let doc = await this.coleccion.get()
        
        let productos = [];

        doc.forEach(d =>{
            productos.push({id: d.id,...d.data()})
        })

        return productos
    }

    async guardar(nuevoElem) {
        const prod = await this.coleccion.add({...nuevoElem})
        return prod;
    }

    async actualizar(nuevoElem,id) {
        await this.coleccion.doc(id).set({...nuevoElem});
    }

    async borrar(id) {
        await this.coleccion.doc(id).delete();
    }

    async borrarAll() {
        // version fea e ineficiente pero entendible para empezar
        try {
            const docs = await this.listarAll()
            const ids = docs.map(d => d.id)
            const promesas = ids.map(id => this.borrar(id))
            const resultados = await Promise.allSettled(promesas)
            const errores = resultados.filter(r => r.status == 'rejected')
            if (errores.length > 0) {
                throw new Error('no se borró todo. volver a intentarlo')
            }
        } catch (error) {
            throw new Error(`Error al borrar: ${error}`)
        }
    }

    async desconectar() {
    }
}

export default ContenedorFirebase
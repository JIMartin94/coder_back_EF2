export default {
    fileSystem: {
        path: './DB'
    },
    
    mongodb: {
        cnxStr: 'mongodb://localhost:27017/coder',
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            serverSelectionTimeoutMS: 5000,
        }
    },

}

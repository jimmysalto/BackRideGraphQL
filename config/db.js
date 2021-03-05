const mongoose = require('mongoose');

require('dotenv').config({path:'.env'});

console.log('process.env.DB_MONGO',process.env.DB_MONGO);

const conectarDB = async () => {
    try {
        await mongoose.connect(process.env.DB_MONGO,{ 
            useNewUrlParser: true,
            useUnifiedTopology:true,
            useFindAndModify:true,
            useCreateIndex:true,
        });

        console.log('');
        console.log('------------------');
        console.log('DB Conectada');
        console.log('------------------');
        console.log('');

    } catch (error) {
        console.log('Ha ocurrido un error.');
        console.log(error);
        process.exit(1);
    }
}

module.exports =conectarDB;
const mongoose = require('mongoose');
let  time = new Date();

const Conductor = mongoose.Schema({
    contadorIntentos: {
        type: Number,
        require:true
    },
    fechaDeRegistro: {
        type: String,
        default:time.toString()
    },
    ultimaActualizacion: {
        type: String,
        default:time.toString()
    },
    activo: {
        type: Boolean,
        require:true,
    },
    vehiculo:{
        type: Array,
        require:true 
    },
    numeroCelular: {
        type: String,
        require:true
    },
    codigoVerificacion: {
        type: String,
        require:true,
    },
    v: {
        type: Number,
        require:true,
    },
    fechaEnvioCodigo:{
        type: String,
        default:Date.now().toString()
    },
    apellido: {
        type: String,
        require:true,
    },
    correoElectronico: {
        type: String,
        require:true,
    },
    nombre:{
        type: String,
        require:true,
    },
    token: {
        type: String,
        require:true,
    },
});

const CoordenadaObjeto = new mongoose.Schema({
    type : {
        type: String,
        require:true,
    }, 
    coordinates : {
        type: Array,
        require:true,
    }
});

const Usuario = new mongoose.Schema({
    nombre :{
        type: String,
        require:true,
    }, 
    apellido : {
        type: String,
        require:true,
    }, 
    numeroCelular : {
        type: String,
        require:true,
    } 
});


const SolicitudSchema = mongoose.Schema({
        contadorIntentos: {
            type: Number,
            require:true
        },
        fechaDeRegistro: {
            type: String,
            default:time.toString()
        },
        ultimaActualizacion: {
            type: String,
            default: time.toString()
        },
        estado: {
            type: Number,
            require:true,
        },
        origenCliente: {
            type: CoordenadaObjeto,
            require:true,
        },
        referenciaOrigen : {
            type: String,
            require:true,
        }, 
        direccionOrigen : {
            type: String,
            require:true,
        },
        destinoCliente: {
            type: CoordenadaObjeto,
            require:true,
        },
        referenciaDestino :{
            type: String,
            require:true,
        },
        direccionDestino : {
            type: String,
            require:true,
        },
        tipoVehiculo : {
            type: String,
            require:true,
        },
        mapaId : {
            type: String,
            require:true,
        },
        tipoSolicitud : {
            type: Number,
            require:true,
        },
        usuario : {
            type: Usuario,
            require:true,
        },
        indetificadorSolicitud : {
            type: String,
            require:true,
        },
        conductor: {
            type: Conductor,
            require:true,
        }
});

module.exports = mongoose.model('Solicitud',SolicitudSchema);
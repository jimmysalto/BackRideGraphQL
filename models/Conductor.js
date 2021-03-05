const mongoose = require('mongoose');

const ConductorSchema = mongoose.Schema({
        numeroCelular:{
            type: String,
            require:true
        }, 
        calificacion: {
            type: Number,
            require:true
        },
        numeroLicencia:{
            type: String,
            require:true
        },
        contadorIntentos: {
            type: Number,
            require:true
        },
        fechaDeRegistro: {
            type:  Date, 
            require:true,
            default:Date.now()
        },
        ultimaActualizacion: {
            type:  Date, 
            require:true,
            default:Date.now()
        },
        numeroLicencia: {
            type: String,
            require:true,
        },
        activo: {
            type: String,
            require:true,
        },
        vehiculo:{
            type: Array,
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
            type: Date, 
            require:true,
            default:Date.now()
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

module.exports = mongoose.model('Conductor',ConductorSchema);
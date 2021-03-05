const mongoose = require('mongoose');


const ConductorVehiculo = mongoose.Schema({
    cedula: {
        type: String,
        require:true,
    },    
    nombre:{
        type: String,
        require:true,
    },
    apellido: {
        type: String,
        require:true,
    },
    email: {
        type: String,
        require:true,
    },
    celular: {
        type: String,
        require:true,
    },    
});
  
const ConductorSchema = mongoose.Schema({
    numeroPlaca: {
        type: String,
        require:true,
    },
    modeloVehiculo: {
        type: String,
        require:true,
    },
    marcaVehiculo: {
        type: String,
        require:true,
    },
    anio: {
        type: Number,
        require:true
    },
    numasignado: {
        type: Number,
        require:true
    },
    nombrePropietario: {
        type: String,
        require:true
    },
    apellidoPropietario: {
        type: String,
        require:true
    },
    tipoVehiculo: {
        type: String,
        require:true
    },
    estado: {
        type: Boolean,
        require:true
    },
    emailPropietario: {
        type: String,
        require:true
    },
    celularPropietario: {
        type: String,
        require:true
    },
    cedulaPropietario: {
        type: String,
        require:true
    },
    conductores:{
        type: Array ,
        require:true 
    },
});

module.exports = mongoose.model('Vehiculos',ConductorSchema);

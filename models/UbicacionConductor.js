const mongoose = require('mongoose');

const UbicacionConductorSchema = mongoose.Schema({
    coordenadas:{
        type: Array,
        require:true,
    },
    idConductor:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Conductor'
    },
    estado:{
        type: Number,
        require:true,
    },
    fechaHora:{
        type: String,
        require:true,
    }
});

module.exports = mongoose.model('UbicacionConductor',UbicacionConductorSchema);
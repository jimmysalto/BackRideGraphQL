const mongoose = require('mongoose');

const ProductoSchema = mongoose.Schema({
    ubicacion:{
        type: Array,
        require:true,
    },
    
});

module.exports = mongoose.model('Pedido',ProductoSchema);
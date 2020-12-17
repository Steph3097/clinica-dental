const mongoose = require('mongoose');
const { Schema } = mongoose;

const FacturaSchema = new Schema ({
    id_producto: [{ type: String, required: true}],
    nombre_producto: {type: String, required: true},
    cantidad_producto: {type: Number, required: true},
    subtotal: {type: Number, required: true},
    total: {type: Number, required: true},
    date: {type: Date, default: Date.now}
    
});

module.exports = mongoose.model('Factura', FacturaSchema);
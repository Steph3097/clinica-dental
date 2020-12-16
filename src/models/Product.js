const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProductSchema = new Schema ({
    product: {type: String, required: true},
    cantidad: {type: Number, required: true},
    precio: {type: Number, required: true},
    
});

module.exports = mongoose.model('Product', ProductSchema);
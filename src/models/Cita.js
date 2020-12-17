const mongoose = require('mongoose');
const { Schema } = mongoose;

const CitaSchema = new Schema ({
    id_client: {type: String, require: true},
    name: {type:String, required: true},
    fecha: {type: Date, require:true},
    detalle: {type: String, required: true},
    odontologo: {type: String, required: true},
});

module.exports = mongoose.model('Cita', CitaSchema);
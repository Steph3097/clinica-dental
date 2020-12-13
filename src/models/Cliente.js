const mongoose = require('mongoose');
const { Schema } = mongoose;

const ClientSchema = new Schema ({
    name: {type: String, required: true},
    lastName: {type: String, required: true},
    cedula: {type: Number, required: true},
    nacimiento: {type: Date, required: true}
});

module.exports = mongoose.model('Cliente', ClientSchema);
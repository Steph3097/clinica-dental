const mongoose = require('mongoose');
const { Schema } = mongoose;

const FileSchema = new Schema ({
    id_client: {type: String, require: true},
    name: {type: String, require:true},
    genre: {type: String, required: true},
    civil_status: {type: String, required: true},
    blood_type: {type: String, required: true},
});

module.exports = mongoose.model('File', FileSchema);
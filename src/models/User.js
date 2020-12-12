const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema ({
    title: {type: String, required: true},
});

module.exports = mongoose.model('User', UserSchema);
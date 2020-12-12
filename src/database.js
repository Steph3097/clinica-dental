const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/dental-db-app', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false
})
.then(db => console.log('DB CONNECTED'))
.catch(err => console.error(err));
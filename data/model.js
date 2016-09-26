let mongoose = require('mongoose')
mongoose.Promise = global.Promise
mongoose.connect(process.env.DATABASE_URL);

let db = mongoose.connection;
db.on('error', () => console.log( 'connection error') )
db.once('open', () => console.log("connected") )

let schema = mongoose.Schema({
    username: { type: String, required: true },
    name: { type: String, required: true },
    password_hash: { type: String, required: true },
    password_salt: { type: String, required: true },
})

let User = mongoose.model('Users', schema );


module.exports = {User};

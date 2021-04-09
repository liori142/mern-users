const mongoose = require('mongoose')
const dbConnection = 'mongodb://localhost:27017/users'
mongoose.connect(dbConnection,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
module.exports = mongoose.connection
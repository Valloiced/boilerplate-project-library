require('dotenv').config()
const mongoose = require('mongoose')

module.exports = async () => {
    let URI = process.env.MONGO_URI
    let client = await mongoose.connect(URI, {useNewUrlParser: true, useUnifiedTopology: true})
}


const mongoose = require("mongoose")


const stockSchema = new mongoose.Schema({
    Symbol : String
})

module.exports = mongoose.model("Stock", stockSchema);
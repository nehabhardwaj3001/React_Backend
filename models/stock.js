const mongoose = require("mongoose")


const stockSchema = new mongoose.Schema({
    Symbol : String,
    Count : Number
})

module.exports = mongoose.model("Stock", stockSchema);
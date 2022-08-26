var mongoose = require("mongoose")
var wordSchema = mongoose.Schema

var word = new wordSchema({
    wordName: String,
    dateAdded: String,
    personalWordInfo: String,
    
})

const data = mongoose.model("data", word)

module.exports = data
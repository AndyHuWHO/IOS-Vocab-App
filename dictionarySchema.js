var mongoose = require("mongoose")
var dictionarySchema = mongoose.Schema

var dictionaryInfo = new dictionarySchema({
    wordName: String,
    definition: String,
    translation: String,
    sentences: String,
    pronunciation: String
})
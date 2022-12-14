
const express = require("express")
const mongoose = require("mongoose")
var app = express()
var Data = require("./wordSchema")

mongoose.connect("mongodb://localhost/iosVocabDB")

mongoose.connection.once("open", ()=>{
    console.log("Connected to iosVocabDB")
}).on("error", (error) => {
    console.log("Failed to connect! " + error)
})


//http://10.0.0.157:8081/create
var server = app.listen(8081, "10.0.0.157",()=>{
    console.log("Server is running!")
})

//CREATE A WORD
//POST request
app.post("/create", (req, res)=>{
    var word = new Data ({
        wordName: req.get("wordName"),
        dateAdded: req.get("date"),
        learningContext: req.get("learningContext")
    })

    word.save().then(()=>{
        if(word.isNew == false) {
            console.log("Saved word!")
            res.send("Saved word!")
        } else {
            console.log("Failed to save word!")
        }
    })

})

//DELETE A WORD
//POST request
app.post("/delete",(req,res) =>{

    Data.findByIdAndDelete(req.get("id"), function (err, docs) {
        if (err){
            console.log(err)
        }
        else{
            console.log("Deleted : ", docs);
        }
    })

    res.send("deleted")
})

//UPDATE A WORD
//POST request
app.post("/update", (req,res)=>{

    Data.findOneAndUpdate({
        _id: req.get("id")
    },{
        wordName: req.get("wordName"),
        dateAdded: req.get("date"),
        learningContext: req.get("learningContext")
    },(err)=>{ 
        console.log("failed to update " + err)
    })
    res.send("updated")
})


//FETCH ALL WORDS
//GET request
app.get("/fetch", (req, res) =>{
    Data.find({}).then((DBitems)=>{
        res.send(DBitems)

    })
})
const mongoose = require('mongoose')
const registerModel = require('./registerModel')

const goalModel = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        require:true,
        ref:'registerModel'
    },
    title:{
        type:String,
        require:[true, "please add title"]
    },
    desc:{
        type:String,
        require:true
    }
},{
    timestamps:true
})

module.exports = mongoose.model("goalModel",goalModel)
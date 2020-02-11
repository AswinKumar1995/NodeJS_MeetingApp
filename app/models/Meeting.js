const mongoose = require('mongoose')
const Schema = mongoose.Schema

let meetingSchema = new Schema({
    meetingId : {type:String,unique:true,required:true},
    adminId : {type:String,default:''},
    adminName:{type:String,default:''},
    userId : {type:String,default:''},
    userName:{type:String,default:''},
    title:{type:String,default:''},
    start:{type:Date,default: new Date()},
    end:{type:Date,default:new Date()},
    location:{type:String,default:''},
    color:{
        primary:{type:String,default:''},
        secondary:{type:String,default:''}
    },
    draggable:{
        type:Boolean,default:true
    },
    resizable:{
        beforeStart:{type:Boolean,default:true},
        afterEnd:{type:Boolean,default:true}
    },
    createdOn:{type:Date,default:Date.now},
    modifiedOn:{type:Date,default:Date.now},

    mailAlert:{type:Boolean,default:false}
})

mongoose.model("Meetings",meetingSchema)
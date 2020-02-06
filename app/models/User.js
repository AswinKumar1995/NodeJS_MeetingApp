// creating schema for user registration

const mongoose = require("mongoose")
    Schema = mongoose.Schema

let userSchema = new Schema({
    userId: {
        type: String,
        default: "",
        index: true,
        unique: true
    },
    firstName: {
        type: String,
        default: ""
    },
    lastName: {
        type: String,
        default: ""
    },
    password: {
        type: String,
        default: "passss"
    },
    email: {
        type: String,
        default: ""
    },
    mobileNumber: {
        type: String,
        default: ""
    },
    createdOn: {
        type: Date,
        default: ""
    },
    friends:[],
    location:{
        type:String,
        default:''
    },
    role: {
        type: String,
        default: ""
    }
})

module.exports = mongoose.model("User", userSchema);
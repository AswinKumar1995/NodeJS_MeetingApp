const nodemailer = require('nodemailer')
const mongoose = require("mongoose")
const UserModel = mongoose.model("User")
const check = require("./checkLib")

//sending mail to user for alleting for the scheduled meeting before 1 minute

let sendAlertMessage = (meetingData) => {
    //extract email id from database by userId
    UserModel.findOne({'userId':meetingData.userId})
    .select(" -__v -_id -password")
    .lean()
    .exec((err,result) => {
        if(err) {
            console.log(err)
        }
        else if (check.isEmpty(result)) {
            // logger.error("No User details present","UserController: getAllUser",10)
            // let apiResponse = response.generate(true,"No users found",404,null)
            console.log('no user is available')
            // res.send(apiResponse)
        }
        else {
            // let apiResponse = response.generate(false,"User details found",200,result)
            let userDetails = result
            NodemailerSendEmail(userDetails,meetingData)
            // res.send(apiResponse)
        }
    })
}

//using nodemailer to send mail to user's email
let NodemailerSendEmail = (userDetails,meetingData) => {
    
    var transporter = nodemailer.createTransport({
        // service: 'gmail',
        // port: 465,
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
            user: '*****',
            pass: '*****'
        }
    });
    let timeString = new Date(meetingData.start)
    var mailOptions = {
        from: '****',
        to: userDetails.email, // userEmail
        subject: `Meeting Reminder- Title :  ${meetingData.title}`,
        text: 'You are receiving this because you (or someone else) have meeting scheduled at '+ timeString + '\n\n' +
            'Please click on the following link, or paste this into your browser to attend the meeting:\n\n' +
            'http://kiddify.co.in/home/'
    }
    console.log(mailOptions)
    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            // logger.error("Failed to send message", "userController : sendMail", 10)
            // let apiResponse = response.generate(true, err.message, 500, null)
            // reject(apiResponse)
            console.log(err)
        }
        else {
            // let apiResponse = response.generate(false, "Reset Password mail sent successfully", 200, null)
            // resolve(apiResponse)
            console.log("Mail sent successfully")
        }
    })

}

module.exports = {
    sendAlertMessage:sendAlertMessage
}
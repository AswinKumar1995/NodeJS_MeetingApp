const socketio = require("socket.io")
const mongoose = require("mongoose")
const shortid = require("shortid")
const logger = require("./../libs/loggerLib")
const events = require("events")
const eventEmitter = new events.EventEmitter();
const tokenLib = require("./../libs/tokenLib")
const check = require("./../libs/checkLib")
const response = require("./../libs/responseLib")
// const ChatModel = mongoose.model("Chat")
const redisLib = require("../libs/redisLib")
const MeetingModel = mongoose.model("Meetings")
const timeLib = require("./../libs/timeLib")
var cron = require('node-cron');
const moment = require('moment')
const sendEmailLib = require("./sendEmail")
// const response = require("./../libs/responseLib")
let setServer = (server) => {
   // let allOnlineUser = [];
    let io = socketio.listen(server);
    let myIo = io.of("")
     
    myIo.on('connection',(socket) => {
        console.log("on connection emitting verify-user event");
        socket.emit("verifyUser","")
        socket.on("set-user",(authToken) => {
            console.log("set-user called")
            tokenLib.verifyClaimWithoutSecret(authToken,(err,user) => {
                if(err){
                    socket.emit("auth-error",{status:500,error:"Please provide correct token"})
                }
                else {
                    console.log("user is verified... setting details")
                    let currentUser = user.data;
                    socket.userId = currentUser.userId;
                    let fullName = `${currentUser.firstName} ${currentUser.lastName}`
                    console.log(`${fullName} is online`)
                    //socket.emit(currentUser.userId,"Your are online")
                    //connecting to redis databse to save online users

                    let key = currentUser.userId
                    let value = fullName

                    let setUserOnline = redisLib.setANewOnlineUserInHash("onlineUsers",key,value,(err,result) => {
                        if(err){
                            console.log("some error occured")
                        }
                        else {
                            redisLib.getAllUserInAHash("onlineUsers",(err,result) => {
                                console.log("--inside getAll users in Hash function")
                                if(err){
                                    console.log(err)
                                }
                                else{
                                    console.log(`${fullName} is online`)
                                    socket.rooms = "edChat"
                                    socket.join(socket.rooms)
                                    socket.to(socket.rooms).broadcast.emit("online-user-list",result);
                                    console.log(result)

                                }
                            })
                        }
                    })
                    // let userObj = {userId:currentUser.userId,fullName:fullName}
                    // allOnlineUser.push(userObj)
                    // console.log(allOnlineUser)

                    // //setting room name

                    // socket.rooms = "edChat"
                    // // joing chat group
                    // socket.join(socket.rooms)
                    // socket.to(socket.rooms).broadcast.emit("online-user-list",allOnlineUser);
                }
            })
            
        })
        // end of set user event listening
        socket.on("disconnect",() => {
            console.log("user is disconnected");
            console.log(socket.userId);
            //deleting the current user from all online user list
            // var removeIndex = allOnlineUser.map(function(user) {return user.userId}).indexOf(socket.userId);
            // allOnlineUser.splice(removeIndex,1);
            // console.log(allOnlineUser);
            // socket.to(socket.rooms).broadcast.emit("online-user-list",allOnlineUser);
            // socket.leave(socket.rooms)

            //removing user from redis database and updating online list
            if(socket.userId){
                redisLib.deleteUserFromHash("onlineUsers",socket.userId)
                redisLib.getAllUserInAHash("onlineUsers",(err,result) => {
                    if(err){
                        console.log(err)
                    }
                    else{
                        socket.leave(socket.rooms)
                        socket.to(socket.rooms).broadcast.emit('online-user-list', result);
                        console.log(result)
                    }
                })
            }

        })
//listening to new meeting event and sending alert to user for new meeting
        socket.on("new-meeting",(data) => {
            console.log("socket meeting received")
            console.log(data)
            data["meetingId"] = shortid.generate()
            console.log(data)
            //event to save the chats
            setTimeout( function (){
                eventEmitter.emit("save-meeting",data)
            },2000)
            data['job'] = 'new-meeting'
            //sending alert to userId
            myIo.emit(data.userId,data)
        })
        socket.on("edit-meeting",(data) => {
            console.log("socket meeting received")
            console.log(data)
            // data["meetingId"] = shortid.generate()
            // console.log(data)
            //event to save the chats
            setTimeout( function (){
                eventEmitter.emit("update-meeting",data)
            },2000)
            data['job'] = 'edit-meeting'
            //sending alert to userId
            myIo.emit(data.userId,data)
        })
//listening to snooze alert and setting timeout for 10 sec 
        socket.on("snooze-alert",(meetingData) => {
            setTimeout( function (){
                let datenow = new Date()
                let datestart = new Date(meetingData.start)
                console.log(datenow.toString())
                let currentTime = getRoundedDate(1, datenow);
                var futureTime = moment(currentTime).add(1,'minute').toDate().toISOString()
                // 
                // .replace("Z","+00:00")
                console.log('current time')
                console.log(currentTime)
                console.log('start time of meeting')
                console.log(datestart)
                console.log('future time')
                console.log(futureTime)
                if(datenow < datestart){
                    console.log("Present time is less than start time")
                    //send alert message again onto front end
                    myIo.emit(meetingData.userId,meetingData)
                }
                else{
                    meetingData.job = 'meeting-start'
                    myIo.emit(meetingData.userId,meetingData)
                    console.log("present time is greater than start time. stopping the alerts")
                }
            },5000)
        })

        

        socket.on("typing",(fullName) => {
            socket.to(socket.rooms).broadcast.emit("typing",fullName)
        })

//scheduled  a cron job which will run every minute to check for meeting scheduled before 1 minute
        cron.schedule('* * * * *', () => {
            console.log('running a task every minute');
            let currentTime = getRoundedDate(1, new Date());
            console.log(currentTime)
            var futureTime = moment(currentTime).add(1,'minute').toDate().toISOString().replace("Z","+00:00")
            var presentTime = currentTime.toISOString().replace("Z","+00:00")
            console.log('futureTime')
            console.log(futureTime)
            console.log('presenttime')
            console.log(presentTime)
            
            MeetingModel.find({'start':futureTime,'mailAlert':false}).exec((err,result) => {
        
                if(err){
                    console.log(err)
                    logger.error(err.message,'Meeting Controller : FilterMeeting',10)
                    let apiResponse = response.generate(true,'Failed to filter meeting',500,null)
                   console.log(apiResponse)
                }
        
                else if(check.isEmpty(result)){
                    logger.info('No Meeting Found','Meeting Controler : FilterMeeting',10)
                    let apiResponse = response.generate(true,'No Meeting Found',404,null)
                    console.log(apiResponse)
                }
        
                else{
                    let apiResponse = response.generate(false,'All the meeting Details are extracted',200,result)
                    console.log(apiResponse)
                    // socket.emit('send-meeting-alert',result)
                    console.log("meeting alert received")
                    console.log(result)
                    let useralert = []
                    for(let meeting of result){
                        // let useralert = meeting
                        console.log( typeof meeting)
                        let meetingObject = JSON.parse(JSON.stringify(meeting));
                        meetingObject['job'] = 'alert'
                        console.log("Check job")
                        console.log(meetingObject['job'])
                        useralert.push(meetingObject)
                        // myIo.emit(meeting.userId,meeting)
                    }
                    for(let alert of useralert){
                        // let useralert = meeting
                        // meeting.job = 'alert'
                        console.log('useralert')
                        console.log(alert)
//sending alert data to user first time
                        myIo.emit(alert.userId,alert)
                        console.log("sending mail")
//send email to user's email
                        
                        console.log("mail sent successfully")
                        setTimeout( function (){
                        eventEmitter.emit("update-mail-status",alert)
                        sendEmailLib.sendAlertMessage(alert)
                        },3000)
                    }
                }
            })
          });//end cron job
        
          let getRoundedDate = (minutes, d=new Date()) => {
        
            let ms = 1000 * 60 * minutes; // convert minutes to ms
            let roundedDate = new Date(Math.round(d.getTime() / ms) * ms);
          
            return roundedDate
          }

          let sendEmail = (userId) => {
              
          }

    })
}


eventEmitter.on('update-meeting',(data) => {
    options = data
    options.mailAlert = false
    MeetingModel.update({'meetingId':options.meetingId},options,{multi:true}).exec((err,result) => {
        if(err) {
            console.log(err);
            // let apiResponse = response.generate(true,"Error Occured",500,null)
            // res.send(apiResponse)
        }

        else if(check.isEmpty(result)){
            console.log("No Meeting Found")
            // let apiResponse = response.generate(true,"No Meeting Found",404,null)
            // res.send(apiResponse)
        }
        else{
            // res.send(result)
            console.log("Meeting updated successsfully")
        }
    })
})

//updating mail status for meeting to true to depict that mail hass been sent for meeting
eventEmitter.on('update-mail-status',(data) => {
    MeetingModel.updateOne({'meetingId':data.meetingId},{$set : {'mailAlert':true}},(err,result) => {
        if (err) {
            console.log(err)
            // let apiResponse = response.generate(true, "Error Occured", 500, null)
            // reject(apiResponse)
        }
        else if (check.isEmpty(result)) {
            console.log("No User Id found")
            // let apiResponse = response.generate(true, "No Notifications found", 404, null)
            // reject(apiResponse)
        }
        else {
            console.log(result)
            // let apiResponse = response.generate(false, "New password is Update", 200, null)
            // resolve(apiResponse)
        }
    })
})
 // saving new meetings to database
eventEmitter.on('save-meeting',(data) => {
    var today = timeLib.now()
    let newMeeting = new MeetingModel({
        meetingId : data.meetingId,
        title : data.title,
        adminId : data.adminId,
        userId:data.userId,
        adminName:data.adminName,
        userName:data.userName,
        start:data.start,
        end:data.end,
        color : data.color,
        draggable : data.draggable,
        resizable:data.resizable,
        createdOn:today,
        modifiedOn:today,
        location:data.location,
        mailAlert:false
    })
    newMeeting.save((err,result) => {
        if(err){
            console.log(`Error occured : ${err}`)
        }
        else if (result == undefined || result == null || result == "") {
            console.log("Meeting is not saved.")
        }
        else {
            console.log("Meeting is Saved");
            console.log(result)
        }
    })
})
// eventEmitter.on('send-meeting-alert',(data) => {
    

// })



module.exports = {
    setServer:setServer
}
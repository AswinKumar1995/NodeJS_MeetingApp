const mongoose = require("mongoose")
const express = require("express")
const shortid = require('shortid')
const response = require("./../libs/responseLib")
const timeLib = require("./../libs/timeLib")
const check = require("./../libs/checkLib")
const logger = require("./../libs/loggerLib")
const moment = require('moment')


const MeetingModel = mongoose.model('Meetings')

//get all meetings by user Id
let getAllMeetingByUser =  (req,res) => {
    MeetingModel.find({'userId':req.params.userId})
        .select('-__v -_id')
        .lean()
        .exec((err,result) => {
            if(err) {
                logger.error(err.message,"MeetingController:getAllMeetingByUser",10)
                let apiResponse = response.generate(true,"Failed to get Meeting Details",500,null)
                res.send(apiResponse)
            }
            else if(check.isEmpty(result)){
                console.log("No Meeting Found")
                logger.info("No Meeting Found","MeetingController:getAllMeetingByUser",10)
                let apiResponse = response.generate(true,"No Meeting Found",404,null)
                res.send(apiResponse)
            }
            else{
                let apiResponse = response.generate(false,"All Meeting Details Found",200,result)
                res.send(apiResponse)
            }
        })
}

//update meeting details by meetingId

let editMeeting = (req,res) => {
    let options = req.body;
    console.log(options)
    MeetingModel.update({'meetingId':req.params.meetingId},options,{multi:true}).exec((err,result) => {
        if(err) {
            console.log(err);
            let apiResponse = response.generate(true,"Error Occured",500,null)
            res.send(apiResponse)
        }

        else if(check.isEmpty(result)){
            console.log("No Meeting Found")
            let apiResponse = response.generate(true,"No Meeting Found",404,null)
            res.send(apiResponse)
        }
        else{
            res.send(result)
        }
    })
}

//create new meeting

let createMeeting = (req,res) => {
    var today = timeLib.now()
    let meetingid = shortid.generate();
    let newMeeting = new MeetingModel({
        meetingId : meetingid,
        title : req.body.title,
        adminId : req.body.adminId,
        userId:req.body.userId,
        start:req.body.start,
        end:req.body.end,
        color : req.body.color,
        draggable : req.body.draggable,
        resizable:req.body.resizable,
        createdOn:today,
        modifiedOn:today
    })

    newMeeting.save((err,result) => {
        if(err){
            console.log(err);
            res.send(err);
        }
        else{
            res.send(result)
        }
    })
}
//delete meeting
let deleteMeeting = (req,res) => {
    MeetingModel.findOneAndRemove({'meetingId':req.params.meetingId}).exec((err,result) => {
        if (err) {
            console.log(err)
            logger.error(err.message, 'Meeting Controller: deleteMeeting', 10)
            let apiResponse = response.generate(true, 'Failed To delete Meeting', 500, null)
            res.send(apiResponse)
        } else if (check.isEmpty(result)) {
            logger.info('No Meeting Found', 'Task Controller: deleteMeeting',10)
            let apiResponse = response.generate(true, 'No Meeting Found', 404, null)
            res.send(apiResponse)
        } else {
            let apiResponse = response.generate(false, 'Deleted the Meeting successfully', 200, result)
            res.send(apiResponse)
        }
    })
}

//view meeting by meeting Id

let viewMeeting  = (req,res) => {
    MeetingModel.findOne({'meetingId':req.params.meetingId}).exec((err,result) => {
        if(err){
            console.log(err)
            logger.error(err.message,'Meeting Controller : viewMeeting',10)
            let apiResponse = response.generate(true,'Failed to view meeting',500,null)
            res.send(apiResponse)
        }

        else if(check.isEmpty(result)){
            logger.info('No Meeting Found','Meeting Controler : viewMeeting',10)
            let apiResponse = response.generate(true,'No Meeting Found',404,null)
            res.send(apiResponse)
        }

        else{
            let apiResponse = response.generate(false,'All the meeting Details are extracted',200,result)
            res.send(apiResponse)
        }
    })

}

//function not being used

let FilterMeetingsByTime = () => {
    let currentTime = getRoundedDate(1, new Date());
    console.log(currentTime)
    var futureTime = moment(currentTime).add(1,'minute').toDate().toISOString().replace("Z","+00:00")
    var presentTime = currentTime.toISOString().replace("Z","+00:00")
    console.log('futureTime')
    console.log(futureTime)
    console.log('presenttime')
    console.log(presentTime)
    
    MeetingModel.find({'start':currentTime}).exec((err,result) => {

        if(err){
            console.log(err)
            logger.error(err.message,'Meeting Controller : FilterMeeting',10)
            let apiResponse = response.generate(true,'Failed to filter meeting',500,null)
            return apiResponse
        }

        else if(check.isEmpty(result)){
            logger.info('No Meeting Found','Meeting Controler : FilterMeeting',10)
            let apiResponse = response.generate(true,'No Meeting Found',404,null)
            return apiResponse
        }

        else{
            let apiResponse = response.generate(false,'All the meeting Details are extracted',200,result)
            console.log(apiResponse)
            return apiResponse
        }
    })
}

let getRoundedDate = (minutes, d=new Date()) => {

    let ms = 1000 * 60 * minutes; // convert minutes to ms
    let roundedDate = new Date(Math.round(d.getTime() / ms) * ms);
  
    return roundedDate
  }

// let testJob = (req,res) => {
    
    
// }






module.exports = {
    getAllMeetingByUser:getAllMeetingByUser,
    deleteMeeting:deleteMeeting,
    editMeeting:editMeeting,
    createMeeting:createMeeting,
    viewMeeting:viewMeeting,
    FilterMeetingsByTime:FilterMeetingsByTime
}



const express = require('express');
const router = express.Router()

const meetingController = require("./../controllers/meetingController")

const appConfig = require("./../../config/appConfig")

let setRouter = (app) => {
    let baseUrl = appConfig.apiVersion + "/meetings"
    app.get(`${baseUrl}/:userId/all`,meetingController.getAllMeetingByUser);
    app.put(`${baseUrl}/:meetingId/edit`,meetingController.editMeeting);
    app.post(`${baseUrl}/:meetingId/delete`,meetingController.deleteMeeting);
    app.post(`${baseUrl}/create`,meetingController.createMeeting)
    app.get(`${baseUrl}/:meetingId/view`,meetingController.viewMeeting);
    app.get(`${baseUrl}/filerMeeting`,meetingController.FilterMeetingsByTime)
}

module.exports = {
    setRouter:setRouter
}
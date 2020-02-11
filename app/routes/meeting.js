const express = require('express');
const router = express.Router()

const meetingController = require("./../controllers/meetingController")

const appConfig = require("./../../config/appConfig")

let setRouter = (app) => {
    let baseUrl = appConfig.apiVersion + "/meetings"
    app.get(`${baseUrl}/:userId/all`,meetingController.getAllMeetingByUser);
    /**
	 * @api {get} /api/v1/meetings/userId/all Get all meetings for the user
	 * @apiVersion 0.0.1
	 * @apiGroup read
	 *
	 * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": false,
	    "message": "All Meeting Details Found",
	    "status": 200,
	    "data": [
					{
						meetingId: "string",
						adminId: "string",
						adminName: "string",
						userId: "string",
						userName: "string",
						title: "string",
						start: "date",
						end: "date",
						location: "string",
						color: "object",
                        draggable: "object",
                        resizable:"object",
                        createdOn:"date",
                        modifiedOn:"date",
                        mailAlert:boolean
					}
	    		]
	    	}
		}
	}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Failed To get Meeting Details",
	    "status": 500,
	    "data": null
	   }
	 */
    
	app.put(`${baseUrl}/:meetingId/edit`,meetingController.editMeeting);
	
	 /**
	 * @api {get} /api/v1/meetings/:meetingId/edit Edit meeting by meetingId
	 * @apiVersion 0.0.1
	 * @apiGroup edit
	 *
	 * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": false,
	    "message": " Meeting Details Updated",
	    "status": 200,
	    "data": [
					{
						meetingId: "string",
						adminId: "string",
						adminName: "string",
						userId: "string",
						userName: "string",
						title: "string",
						start: "date",
						end: "date",
						location: "string",
						color: "object",
                        draggable: "object",
                        resizable:"object",
                        createdOn:"date",
                        modifiedOn:"date",
                        mailAlert:boolean
					}
	    		]
	    	}
		}
	}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Failed To update Meeting Details",
	    "status": 500,
	    "data": null
	   }
	 */
    
	app.post(`${baseUrl}/:meetingId/delete`,meetingController.deleteMeeting);
	
	/**
	 * @api {get} /api/v1/meetings/:meetingId/delete delete meeting by meetingId
	 * @apiVersion 0.0.1
	 * @apiGroup delete
	 *
	 * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": false,
	    "message": " Deleted the meeting successfully",
	    "status": 200,
	    "data": null
	    	}
		}
	}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Failed To deltete Meeting",
	    "status": 500,
	    "data": null
	   }
	 */
	app.post(`${baseUrl}/create`,meetingController.createMeeting)
	/**
	 * @api {get} /api/v1/meetings/userId/all Create Meeting
	 * @apiVersion 0.0.1
	 * @apiGroup create
	 *
	 * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
						meetingId: "string",
						adminId: "string",
						adminName: "string",
						userId: "string",
						userName: "string",
						title: "string",
						start: "date",
						end: "date",
						location: "string",
						color: "object",
                        draggable: "object",
                        resizable:"object",
                        createdOn:"date",
                        modifiedOn:"date",
                        mailAlert:boolean
	    	}
		}
	}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Failed To create new  Meeting",
	    "status": 500,
	    "data": null
	   }
	 */
	
	app.get(`${baseUrl}/:meetingId/view`,meetingController.viewMeeting);
	 /**
	 * @api {get} /api/v1/meetings/userId/all Get all meeting details by meetingId
	 * @apiVersion 0.0.1
	 * @apiGroup read
	 *
	 * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": false,
	    "message": "All Meeting Details Found",
	    "status": 200,
	    "data": [
					{
						meetingId: "string",
						adminId: "string",
						adminName: "string",
						userId: "string",
						userName: "string",
						title: "string",
						start: "date",
						end: "date",
						location: "string",
						color: "object",
                        draggable: "object",
                        resizable:"object",
                        createdOn:"date",
                        modifiedOn:"date",
                        mailAlert:boolean
					}
	    		]
	    	}
		}
	}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Failed To get Meeting Details",
	    "status": 500,
	    "data": null
	   }
	 */
    app.get(`${baseUrl}/filerMeeting`,meetingController.FilterMeetingsByTime)
}

module.exports = {
    setRouter:setRouter
}
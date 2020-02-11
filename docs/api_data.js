define({ "api": [
  {
    "type": "get",
    "url": "/api/v1/meetings/userId/all",
    "title": "Create Meeting",
    "version": "0.0.1",
    "group": "create",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>The token for authentication.(Send authToken as query parameter, body parameter or as a header)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n\t\t\t\t\t\tmeetingId: \"string\",\n\t\t\t\t\t\tadminId: \"string\",\n\t\t\t\t\t\tadminName: \"string\",\n\t\t\t\t\t\tuserId: \"string\",\n\t\t\t\t\t\tuserName: \"string\",\n\t\t\t\t\t\ttitle: \"string\",\n\t\t\t\t\t\tstart: \"date\",\n\t\t\t\t\t\tend: \"date\",\n\t\t\t\t\t\tlocation: \"string\",\n\t\t\t\t\t\tcolor: \"object\",\n                        draggable: \"object\",\n                        resizable:\"object\",\n                        createdOn:\"date\",\n                        modifiedOn:\"date\",\n                        mailAlert:boolean\n\t    \t}\n\t\t}\n\t}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\t    \"error\": true,\n\t    \"message\": \"Failed To create new  Meeting\",\n\t    \"status\": 500,\n\t    \"data\": null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "routes/meeting.js",
    "groupTitle": "create",
    "name": "GetApiV1MeetingsUseridAll"
  },
  {
    "type": "get",
    "url": "/api/v1/meetings/:meetingId/delete",
    "title": "delete meeting by meetingId",
    "version": "0.0.1",
    "group": "delete",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>The token for authentication.(Send authToken as query parameter, body parameter or as a header)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n\t    \"error\": false,\n\t    \"message\": \" Deleted the meeting successfully\",\n\t    \"status\": 200,\n\t    \"data\": null\n\t    \t}\n\t\t}\n\t}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\t    \"error\": true,\n\t    \"message\": \"Failed To deltete Meeting\",\n\t    \"status\": 500,\n\t    \"data\": null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "routes/meeting.js",
    "groupTitle": "delete",
    "name": "GetApiV1MeetingsMeetingidDelete"
  },
  {
    "type": "get",
    "url": "/api/v1/meetings/:meetingId/edit",
    "title": "Edit meeting by meetingId",
    "version": "0.0.1",
    "group": "edit",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>The token for authentication.(Send authToken as query parameter, body parameter or as a header)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n\t    \"error\": false,\n\t    \"message\": \" Meeting Details Updated\",\n\t    \"status\": 200,\n\t    \"data\": [\n\t\t\t\t\t{\n\t\t\t\t\t\tmeetingId: \"string\",\n\t\t\t\t\t\tadminId: \"string\",\n\t\t\t\t\t\tadminName: \"string\",\n\t\t\t\t\t\tuserId: \"string\",\n\t\t\t\t\t\tuserName: \"string\",\n\t\t\t\t\t\ttitle: \"string\",\n\t\t\t\t\t\tstart: \"date\",\n\t\t\t\t\t\tend: \"date\",\n\t\t\t\t\t\tlocation: \"string\",\n\t\t\t\t\t\tcolor: \"object\",\n                        draggable: \"object\",\n                        resizable:\"object\",\n                        createdOn:\"date\",\n                        modifiedOn:\"date\",\n                        mailAlert:boolean\n\t\t\t\t\t}\n\t    \t\t]\n\t    \t}\n\t\t}\n\t}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\t    \"error\": true,\n\t    \"message\": \"Failed To update Meeting Details\",\n\t    \"status\": 500,\n\t    \"data\": null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "routes/meeting.js",
    "groupTitle": "edit",
    "name": "GetApiV1MeetingsMeetingidEdit"
  },
  {
    "type": "get",
    "url": "/api/v1/meetings/userId/all",
    "title": "Get all meetings for the user",
    "version": "0.0.1",
    "group": "read",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>The token for authentication.(Send authToken as query parameter, body parameter or as a header)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n\t    \"error\": false,\n\t    \"message\": \"All Meeting Details Found\",\n\t    \"status\": 200,\n\t    \"data\": [\n\t\t\t\t\t{\n\t\t\t\t\t\tmeetingId: \"string\",\n\t\t\t\t\t\tadminId: \"string\",\n\t\t\t\t\t\tadminName: \"string\",\n\t\t\t\t\t\tuserId: \"string\",\n\t\t\t\t\t\tuserName: \"string\",\n\t\t\t\t\t\ttitle: \"string\",\n\t\t\t\t\t\tstart: \"date\",\n\t\t\t\t\t\tend: \"date\",\n\t\t\t\t\t\tlocation: \"string\",\n\t\t\t\t\t\tcolor: \"object\",\n                        draggable: \"object\",\n                        resizable:\"object\",\n                        createdOn:\"date\",\n                        modifiedOn:\"date\",\n                        mailAlert:boolean\n\t\t\t\t\t}\n\t    \t\t]\n\t    \t}\n\t\t}\n\t}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\t    \"error\": true,\n\t    \"message\": \"Failed To get Meeting Details\",\n\t    \"status\": 500,\n\t    \"data\": null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "routes/meeting.js",
    "groupTitle": "read",
    "name": "GetApiV1MeetingsUseridAll"
  },
  {
    "type": "get",
    "url": "/api/v1/meetings/userId/all",
    "title": "Get all meeting details by meetingId",
    "version": "0.0.1",
    "group": "read",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>The token for authentication.(Send authToken as query parameter, body parameter or as a header)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n\t    \"error\": false,\n\t    \"message\": \"All Meeting Details Found\",\n\t    \"status\": 200,\n\t    \"data\": [\n\t\t\t\t\t{\n\t\t\t\t\t\tmeetingId: \"string\",\n\t\t\t\t\t\tadminId: \"string\",\n\t\t\t\t\t\tadminName: \"string\",\n\t\t\t\t\t\tuserId: \"string\",\n\t\t\t\t\t\tuserName: \"string\",\n\t\t\t\t\t\ttitle: \"string\",\n\t\t\t\t\t\tstart: \"date\",\n\t\t\t\t\t\tend: \"date\",\n\t\t\t\t\t\tlocation: \"string\",\n\t\t\t\t\t\tcolor: \"object\",\n                        draggable: \"object\",\n                        resizable:\"object\",\n                        createdOn:\"date\",\n                        modifiedOn:\"date\",\n                        mailAlert:boolean\n\t\t\t\t\t}\n\t    \t\t]\n\t    \t}\n\t\t}\n\t}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\t    \"error\": true,\n\t    \"message\": \"Failed To get Meeting Details\",\n\t    \"status\": 500,\n\t    \"data\": null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "routes/meeting.js",
    "groupTitle": "read",
    "name": "GetApiV1MeetingsUseridAll"
  }
] });

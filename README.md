# New Skene API

This API is hosted on Parse.com [homepage](http://skene.parseapp.com/)

## Authorization

Authorization headers should be specified for each request.

Header | Value
-------|-------
X-Parse-Application-Id | app id
X-Parse-REST-API-Key   | key
Content-Type           | application/json

## Methods

### POST `https://api.parse.com/1/classes/message`

#### Description

Add new message

#### Params

Name | Type
-----|------
text | String
latitude | Number
longitude | Number

#### Response

```json
{
  "objectId": "zYHU0jTKrL",
  "createdAt": "2014-11-06T21:39:59.304Z"
}
```

----

### POST `https://api.parse.com/1/functions/get`

#### Description

Get messages:

* By location and radius
* By parentId
* All

#### Params

Name | Type
-----|------
latitude | Number
longitude | Number
radius | Number
parendId | String
count | Number **default: 50**

```json
{
  "latitude": 60,
  "longitude": 22,
  "radius": 100000
}
```

#### Response

```json
{
  "result": [{
    "pubTime": 1415301813,
    "parentId": "0",
    "text": "hell yeah",
    "longitude": 22.3049881,
    "latitude": 60.476265,
    "pubDelay": 0,
    "objectId": "rIy2NdFz0a",
    "createdAt": "2014-11-06T19:23:35.519Z",
    "updatedAt": "2014-11-06T19:23:35.519Z",
    "__type": "Object",
    "className": "message"
  },

  {
    "latitude": 60.46,
    "longitude": 22.3048,
    "parentId": "0",
    "pubDelay": 0,
    "pubTime": 1415305617,
    "text": "another one",
    "objectId": "iROWzlxJKf",
    "createdAt": "2014-11-06T20:26:56.946Z",
    "updatedAt": "2014-11-06T20:28:11.161Z",
    "__type": "Object",
    "className": "message"
  }]
}
```

### POST `https://api.parse.com/1/functions/map_data`

#### Description

Get map point by projection

#### Params

Name  | Type
----- | -----
min_lat | Number
max_lat | Number
min_lon | Number
max_lon | Number

#### Response

```json
{
  "result": [{
    "longitude": 22.3049881,
    "latitude": 60.476265,
    "objectId": "rIy2NdFu0a",
    "createdAt": "2014-11-06T19:23:35.519Z",
    "updatedAt": "2014-11-06T19:23:35.519Z",
    "__type": "Object",
    "className": "message"
  },

  {
    "latitude": 60.46,
    "longitude": 22.3048,
    "objectId": "iROWzlxJLf",
    "createdAt": "2014-11-06T20:26:56.946Z",
    "updatedAt": "2014-11-06T20:28:11.161Z",
    "__type": "Object",
    "className": "message"
  }]
}
```

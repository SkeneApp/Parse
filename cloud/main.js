/**
 * Source: http://www.movable-type.co.uk/scripts/latlong.html
 */

// Extend Number object with method to convert numeric degrees to radians
if (typeof Number.prototype.toRadians == 'undefined') {
    Number.prototype.toRadians = function() { return this * Math.PI / 180; };
}
// Extend Number object with method to convert radians to numeric (signed) degrees
if (typeof Number.prototype.toDegrees == 'undefined') {
    Number.prototype.toDegrees = function() { return this * 180 / Math.PI; };
}


// Use Parse.Cloud.define to define as many cloud functions as you want.
// For example:
Parse.Cloud.define("hello", function(request, response) {
  response.success("Hello world!");
});

/**
 * GET messages
 * Available params:
 *   latitude Number
 *   longitude Number
 *   radius Number radius of area in meters
 *   timestamp Number ?
 *   count Number (default: 50) How many messages to return
 *   parentId ObjectID
 */
Parse.Cloud.define('get', function (req, res) {
  var query = new Parse.Query('message');

  var rad = +req.params.radius;
  var lat = +req.params.latitude;
  var lon = +req.params.longitude;
  var p_id = req.params.parentId;
  var count = +req.params.count || 50;
  var R = 6371; // Earth's radius
  var edges = {};

  if(rad & lat & lon) {
    // Select by location
    rad /= 1000; // Convert to km

    edges.max_lat = lat + (rad / R).toDegrees();
    edges.min_lat = lat - (rad / R).toDegrees();
    edges.max_lon = lon + ( rad / R / Math.cos(lat.toRadians()) ).toDegrees();
    edges.min_lon = lon - ( rad / R / Math.cos(lat.toRadians()) ).toDegrees();

    query.greaterThanOrEqualTo('latitude', edges.min_lat);
    query.lessThanOrEqualTo('latitude', edges.max_lat);
    query.greaterThanOrEqualTo('longitude', edges.min_lon);
    query.lessThanOrEqualTo('latitude', edges.max_lon);

  } else if (p_id) {
    // Select by parent ID
    query.equalTo('parentId', p_id);
  } else {
    // Select all
  }

  query.limit(50);
  query.descending('objectId');
  query.find({
    success : function (results) {
      res.success(results);
    },
    error : function () {
      res.error('Error');
    }
  })
});

/**
 * GET map data
 * Available parameters:
 *   min_lat: min/max lat/long of message
 *   max_lat: --
 *   min_lon: --
 *   max_lon: --
 *   timestamp (default: 0): get messages posted after this time. Format: Unix timestamp
 *   count (default: 50): maximum number of messages to return
 */
Parse.Cloud.define('map_data', function (req, res) {
  var count = +req.params.count || 50;
  var query = new Parse.Query('message');

  query.greaterThanOrEqualTo('latitude', +req.params.min_lat);
  query.lessThanOrEqualTo('latitude', +req.params.max_lat);
  query.greaterThanOrEqualTo('longitude', +req.params.min_lon);
  query.lessThanOrEqualTo('latitude', +req.params.max_lon);
  query.equalTo('parentId', 0);

  query.limit(count);
  query.descending('objectId');
  query.find({
    success : function (results) {
      res.success(results);
    },
    error : function () {
      res.error(arguments);
    }
  })
});

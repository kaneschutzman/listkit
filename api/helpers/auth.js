var mongoHelper = require('./mongoHelper');
var tokenHelper = require('./tokenHelper');

/*
* Middleware: (same as isLogged old version) verify token and push data in req._user
*/
exports.verify = function(req, res, next) {
	var headers = req.headers;
	if (headers == null) return res.send(401);

	// Get token from headers
	try {
		var token = tokenHelper.extractTokenFromHeader(headers);
	} catch (err) {
		console.log(err);
		return res.send(401);
	}

	mongoHelper.getDataByToken(token, function(err, data) {
		if (err) return res.send(401);
		req._user = data;
		next();
	});
};

/*
* Create token by verified credentials with 48 hrs ttl.
*/
exports.createAndStoreToken = function(data, callback) {
	data = data || {};

	if (data != null && typeof data !== 'object') callback(new Error('data is not an Object'));

	tokenHelper.createToken(function(err, token) {
		if (err) callback(err);

		mongoHelper.setTokenWithData(token, data, function(err, success) {
			if (err) callback(err);

			if (success) {
				callback(null, token);
			}
			else {
				callback(new Error('Error when saving token'));
			}
		});
	});
};

/*
* Expires token by 'logout' button removing from mongoDB (do have some latency).
*/
exports.expireToken = function(headers, callback) {
	if (headers == null) callback(new Error('Headers are null'));

	// Get token from headers
	try {
		var token = tokenHelper.extractTokenFromHeader(headers);
		if (token == null) callback(new Error('Token is null'));
		mongoHelper.expireToken(token, callback);
	} catch (err) {
		console.log(err);
		return callback(err);
	}	
}
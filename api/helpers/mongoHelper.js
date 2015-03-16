var Session	= require('../models/session');

/*
* Stores token with user data for a ttl - setup in the Session Model
* token: String - Token used as Session Model -> 'user_token' 
*/
exports.setTokenWithData = function(token, data, callback) {
	if (token == null) throw new Error('Token is null');
	if (data != null && typeof data !== 'object') throw new Error('data is not an Object');

	var userData = data || {};
	var newSession = new Session();
			newSession.user_token = token;
	   		newSession.user_id = userData.user_id;
	  	 	newSession.save(function(err, reply) {	     
		
				if (err) callback(err);

				if (reply) {
					callback(null, true);
				} else {
					callback(new Error('Token not set in mongoDB'));
				}
			});
};

/*
* Gets the associated data of token from mongoDB.
*/
exports.getDataByToken = function(token, callback) {
	if (token == null) callback(new Error('Token is null'));

	Session.findOne({ 'user_token' : token }, function (err, user) {
		if (err) callback(err);

		userData = { 'user_id' : user.user_id } //to be expanded.

		if (userData != null) callback(null, userData);
		else callback(new Error('Token Not Found'));
	});
};

/*
* Expires token by deleting the document in mongoDB.
* callback(null, true) if successfully deleted.
*/
exports.expireToken = function(token, callback) {
	if (token == null) callback(new Error('Token is null'));

	Session.find({ 'user_token' : token }).remove( function (err, reply) {
		if (err) callback(err);

		if (reply) callback(null, true);
		else callback(new Error('Token not found'));
	});
};
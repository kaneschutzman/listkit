var List = require('../models/list');
var Base62 = require('base62');

exports.save = function(req, res) {

	var forked_id = req.body.forked_id;
	var nickname = req.body.nickname || '';
	var lifestyle = req.body.lifestyle || '';
	var list = req.body.list || '';

		if (forked_id) {
		var pretty_forked_id = decodeId(forked_id);
		var query = { '_id' : pretty_forked_id };
		var update = {  $inc: { forked: 1 } };
		var options = { };
		List.findOneAndUpdate(query, update, options, function(err, list) {
				
		if (err) {
			console.log(err);
			return res.send(401);
		}

		if (list == undefined) {		
			return res.send(401, {'err' : 'list not found'});
		}
		//return res.send(200, { data : list.list });
		});
		}
			var newList = new List();
			newList.nickname = nickname;
	   		newList.lifestyle = lifestyle;
	   		newList.list = list;
	  	 	newList.save(function(err, reply) {	     
		
				if (err) callback(err);

				if (reply) {
				var pretty_id = encodeId(reply._id);
				return res.send(200, { id : pretty_id, type : 'List' } );
				} else {
					callback(new Error('mongoDB error'));
				}
			});
};

exports.load = function(req, res) {

		var pretty_id = req.param('id') || '';
		var original_id = decodeId(pretty_id);

		List.findOne({ '_id' : original_id }, function (err, list) {
		
		if (err) {
			console.log(err);
			return res.send(401);
		}

		if (list == undefined) {		
			return res.send(401, {'err' : 'list not found'});
		}
		return res.send(200, { data : list.list, lifestyle: list.lifestyle });
	});
};

exports.edit = function(req, res) {

	var pretty_id = req.body.id || '';
	var nickname = req.body.nickname || '';
	var lifestyle = req.body.lifestyle || '';
	var list = req.body.list || '';
	
		var original_id = decodeId(pretty_id);
		var query = { '_id' : original_id };
		var update = { 'list' : list };
		var options = { };
		List.findOneAndUpdate(query, update, options, function(err, list) {
				
		if (err) {
			console.log(err);
			return res.send(401);
		}

		if (list == undefined) {		
			return res.send(401, {'err' : 'list not found'});
		}
		return res.send(200, { data : list.list });
	});
};

exports.mostforked = function(req, res) {

		List.find().limit(5).sort({forked: -1}).exec(function (err, list) {
		
		if (err) {
			console.log(err);
			return res.send(401);
		}

		if (list == undefined) {		
			return res.send(401, {'err' : 'list not found'});
		}

		var template = {
 		    __v: true,
			_id: function(src){
               return encodeId(src._id);
            },
			created_at: false,
			forked: true,
			list:
			  { completed: true, title: true },
			lifestyle: true,
			nickname: true
   		}; 

   		var copy = cloneObjectByTemplate(list, template);
		return res.send(200, { data : copy });
	});
};

exports.latestfive = function(req, res) {

		List.find().limit(5).sort({created_at: -1}).exec(function (err, list) {
		
		if (err) {
			console.log(err);
			return res.send(401);
		}

		if (list == undefined) {		
			return res.send(401, {'err' : 'list not found'});
		}

		var template = {
 		    __v: true,
			_id: function(src){
               return encodeId(src._id);
            },
			created_at: false,
			forked: true,
			list:
			  { completed: true, title: true },
			lifestyle: true,
			nickname: true
   		}; 

   		var copy = cloneObjectByTemplate(list, template);
		return res.send(200, { data : copy });
	});
};

exports.search = function(req, res) {

		var lifestyle = req.body.lifestyle || '';
		
		List.find({ 'lifestyle' : new RegExp("^" + lifestyle, "i") }).limit(10).exec(function (err, list) {
		
		if (err) {
			console.log(err);
			return res.send(401);
		}

		if (list == undefined) {		
			return res.send(401, {'err' : 'list not found'});
		}
		
		var template = {
 		    __v: true,
			_id: function(src){
               return encodeId(src._id);
            },
			created_at: false,
			forked: true,
			list:
			  { completed: true, title: true },
			lifestyle: true,
			nickname: true
   		}; 
		
   		var copy = cloneObjectByTemplate(list, template);
		return res.send(200, { data : copy });
	});
};

/* helpers */ 
function decodeId(id) {
var firsthalf = id.substring(0,8);
var secondhalf = id.substring(8,17);
var dec_fh = Base62.decode(firsthalf);
var dec_sh = Base62.decode(secondhalf);
var original_id = dec_fh.toString(16) + dec_sh.toString(16);
return original_id;
};

function encodeId(id) {
var firsthalf = id.toString().substring(0,12);
var secondhalf = id.toString().substring(12,24);
var dec_fh = parseInt(firsthalf, 16);
var dec_sh = parseInt(secondhalf, 16);
var pretty_id = Base62.encode(dec_fh) + Base62.encode(dec_sh);
return pretty_id;
};

function isFunction(functionToCheck) {
       var getType = {};
       return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
};

function cloneObjectByTemplate(obj, tpl, cloneConstructor) {
   if (typeof cloneConstructor === "undefined") {
       cloneConstructor = false;
   }
   if (obj == null || typeof (obj) != 'object') return obj;

   //if we have an array, work through it's contents and apply the template to each item...
   if (Array.isArray(obj)) {
       var ret = [];
       for (var i = 0; i < obj.length; i++) {
           ret.push(cloneObjectByTemplate(obj[i], tpl, cloneConstructor));
       }
       return ret;
   }

   //otherwise we have an object...
   //var temp:any = {}; // obj.constructor(); // we can't call obj.constructor because typescript defines this, so if we are dealing with a typescript object it might reset values.
   var temp = cloneConstructor ? new obj.constructor() : {};

   for (var key in tpl) {
       //if we are provided with a function to determine the value of this property, call it...
       if (isFunction(tpl[key])) {
           temp[key] = tpl[key](obj); //assign the result of the function call, passing in the value
       } else {
           //if our object has this property...
           if (obj[key] != undefined) {
               if (Array.isArray(obj[key])) {
                   temp[key] = [];
                   for (var i = 0; i < obj[key].length; i++) {
                       temp[key].push(cloneObjectByTemplate(obj[key][i], tpl[key], cloneConstructor));
                   }
               } else {
                   temp[key] = cloneObjectByTemplate(obj[key], tpl[key], cloneConstructor);
               }
           }
       }
   }

   return temp;
};  
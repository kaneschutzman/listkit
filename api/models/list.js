var mongoose = require('mongoose');

var listSchema = mongoose.Schema({

    nickname    :   { type: String, default: "" },
    lifestyle   :   { type: String, default: "" },
    list        :   [],
    forked		: 	{ type: Number, default: 0 },
	created_at  :   { type: Date, default: Date.now }      
});

module.exports = mongoose.model('List', listSchema);

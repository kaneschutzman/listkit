var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

var listSchema = mongoose.Schema({

    nickname    :   { type: String, default: "" },
    lifestyle   :   { type: String, default: "" },
    list        :   [],
    forked		: 	{ type: Number, default: 0 },
	created_at  :   { type: Date, default: Date.now }      
});

// generating a hash
listSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
listSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

// create the model for users and expose
module.exports = mongoose.model('List', listSchema);

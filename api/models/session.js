var mongoose = require('mongoose');

var sessionSchema   = mongoose.Schema({
    sessionActivity	:    { type: Date, expires: '172800s', default: Date.now },
    user_token		:    { type: String, required: true },
    user_id 		:    { type: String, required: true }
});

module.exports = mongoose.model('Session', sessionSchema);
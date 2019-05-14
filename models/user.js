var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var UserSchema = mongoose.Schema({
    username: {
        type: String,
        index: true
    },
    password: {
        type: String
    },
    email: {
        type: String
    },
    name: {
        type: String
    }
});

var User = module.exports = mongoose.model('User', UserSchema);

module.exports.createUser = function(newUser, cb){
    bcrypt.genSalt(10, function(err, salt){
        bcrypt.hash(newUser.password, salt, function(err, hash){
            newUser.password = hash;
            newUser.save(cb);
        });
    });
}

module.exports.getUserByUsername = function(username, cb){
    var query = {username: username};
    User.findOne(query, cb);
}

module.exports.getUserById = function(id, cb){
    User.findById(id, cb);
}

module.exports.comparePassword = function(candidatePassword, hash, cb){
    bcrypt.compare(candidatePassword, hash, function(err, isMatch){
        if(err) throw err;
        cb(null, isMatch);
    });
}
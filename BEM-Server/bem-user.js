const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var UserSchema = new Schema({

    username: {
        type: String,
        required: true
    },
    full_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    user_type:{
        type: String
    },
    bookings:{
        type: Array
    },
    created_at: Date,
});

UserSchema.pre('save', function (next) {
    var user = this;

    var currentDate = new Date();

    if (!user.created_at) {
        user.created_at = currentDate;
        user.user_type = 'customer';
        user.bookings= [];
    }
    next();
})

module.exports = mongoose.model('User', UserSchema);
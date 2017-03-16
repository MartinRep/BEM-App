const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var BookingSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    service: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: Number,
        required: true
    },
    timeMargin: {
        type: Number
    },
    travelTime: {
        type: String
    },
    status: {
        type: String
    },
    created_at: Date,
});

BookingSchema.pre('save', function (next) {
    var booking = this;

    var currentDate = new Date();

    if (!booking.created_at) {
        booking.created_at = currentDate;
    }
    next();
})

module.exports = mongoose.model('Booking', BookingSchema);
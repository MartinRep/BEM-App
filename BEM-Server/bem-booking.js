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
    candidates: {
        type: Array
    },
    selected: {
        type: Object
    },
    imgsrc: {
        type: String
    },
    id:{},
    created_at: Date,
});

BookingSchema.pre('save', function (next) {
    var booking = this;

    var currentDate = new Date();

    if (!booking.created_at) {
        booking.created_at = currentDate;
        booking.status = 'new';
        booking.candidates = null;
        booking.selected = null;
        booking.id = '_' + booking._id.toString();
    }
    switch(booking.location){
        case 'Galway':
            booking.imgsrc = 'http://d5qsyj6vaeh11.cloudfront.net/images/destinations/galway%20city/galway-city-new/3img-collage.jpg';
            break;
        case 'Dublin':
            booking.imgsrc = 'http://www.colliers.ie/img/ireland-ab.jpg';
            break;
    }
    next();
})

module.exports = mongoose.model('Booking', BookingSchema);
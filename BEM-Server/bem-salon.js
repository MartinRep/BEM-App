const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var SalonSchema = new Schema({

    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    services: {
        type: Array,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    imgsrc:{
        type: String
    },
    rating:{
        type: Number
    },
    review:{
        type: Array
    },
    created_at: Date,
});

SalonSchema.pre('save', function (next) {
    var salon = this;

    var currentDate = new Date();

    if (!salon.created_at) {
        salon.created_at = currentDate;
        salon.rating = 0;
        salon.review = [];
    }
    next();
})

module.exports = mongoose.model('Salon', SalonSchema);
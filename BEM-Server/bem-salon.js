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
    service: {
        type: String,
        required: true
    },
    created_at: Date,
});

SalonSchema.pre('save', function (next) {
    var salon = this;

    var currentDate = new Date();

    if (!salon.created_at) {
        salon.created_at = currentDate;
    }
    next();
})

module.exports = mongoose.model('Salon', SalonSchema);
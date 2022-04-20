const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    phoneNo: {
        type:String,
        required: true
    }
});

const contact = mongoose.model('Contact', contactSchema);
module.exports = contact;
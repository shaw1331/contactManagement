const mongoose = require("mongoose")

const Contact = new mongoose.Schema(
    {
    name: {type: String, required: true},
    phone: {type: Number, required: true},
    email: {type: String, required: true, unique: true},
    linkedinURL: {type: String, required: true}
    },
    { collection: 'contact-data'}
);

const model = mongoose.model('contactData', Contact);
module.exports = model;

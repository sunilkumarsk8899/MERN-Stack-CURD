const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title       :   String,
    subheading  :   String,
    description : String,
    status      : String
});

module.exports = mongoose.model("products",productSchema);
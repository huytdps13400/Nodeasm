var mongoose = require('mongoose');
var categorySchema = new mongoose.Schema({
    
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
})
module.exports = mongoose.model('category', categorySchema,'category');
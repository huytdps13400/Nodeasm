var mongoose = require('mongoose');
var productSchema = new mongoose.Schema({
    
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    price: {
        type: Number,
        required: true,
    },
    published: { type: Date },
    mota: {
        type: String,
        required: true,
    },
    _idCategory: {type: mongoose.Schema.Types.ObjectId, ref: 'category'},
})
module.exports = mongoose.model('product', productSchema,'product');
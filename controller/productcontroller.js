var uniqid = require("uniqid");
var fs = require("fs");
var productservices = require('../services/productservices');
const Product = require("../modal/product");
const {
  multipleMongooseToObject,
  mongooseToObject,
} = require("../until/mongoose");
function convert(str) {
  var date = new Date(str),
    mnth = ("0" + (date.getMonth() + 1)).slice(-2),
    day = ("0" + date.getDate()).slice(-2);
  return [date.getFullYear(), mnth, day].join("-");
}

exports.addproduct = async (req, res, next) => {
  let { name, image ,price ,published, mota ,_idCategory } = req;
  console.log('DATE-----',published);
    const product = new Product({
      name: name,
      image: image,
      price: price,
      published: convert(published),
      mota :mota,
      _idCategory: _idCategory
    });
    productservices.addproduct(product,res)
};
exports.productlist = async function(req, res){
 return await productservices.getDataproduct();
};

exports.productlistsend = async (req, res) => {
  let productlist = await Product.find({}).populate('_idCategory');
 res.json(productlist)
};
exports.getDataByID = async function getDataByIDgetData(id){
   
  return await productservices.getDataByID(id);
}
exports.editData = async function editData(id,params,res){
  let{name,price,image,published,mota,_idCategory} =params
  let category = {id,name,image,price,published,_idCategory,mota}

    productservices.editData(category,res)
//    return productservices.editData(product)
}
exports.removeData = async function removeData(id,res){
  productservices.removeData(id,res)
//    return productservices.editData(product)
}
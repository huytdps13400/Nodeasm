var categoryservices = require('../services/categoryservices');
const Category = require("../modal/category");
const {
    multipleMongooseToObject,
    mongooseToObject,
  } = require("../until/mongoose");
exports.categorytlist = async function (req, res) {
  return await categoryservices.getDatacategory();
    // let categorylist = await Category.find({}).populate('_id');
    // res.render("all-category", { category: multipleMongooseToObject(categorylist) });
  };
 exports.addCategory = function addCategory(req,res){
    let { name, image } = req;
    // let images = null;
    // console.log(req.files);
    // if (req.files) {
    //   images = req.files.image;
    //   let filename = "/product/" + uniqid() + "-" + image.name;
    //   images.mv(`./uploads/${filename}`);
    //   images = filename;
    //   console.log(images);
    // }
    const category = new Category({
      name: name,
      image: image,
    });
    categoryservices.addcategory(category,res)
 }
 exports.categorylistsend = async (req, res) => {
    let categorylist = await Category.find({});
   res.json(categorylist)
  };
  exports.getDataByID = async function getDataByIDgetData(id){
   
    return await categoryservices.getDataByID(id);
}
exports.editData = async function editData(id,params,res){
  let{name,images} =params
  let category = {id,name,images}

    categoryservices.editData(category,res)
//    return productservices.editData(product)
}
exports.removeData = async function removeData(id,res){
    categoryservices.removeData(id,res)
//    return productservices.editData(product)
}
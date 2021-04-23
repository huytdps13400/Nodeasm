const product = require("../modal/product");
var productcontroller = require('../controller/productcontroller');
function convert(str) {
  var date = new Date(str),
    mnth = ("0" + (date.getMonth() + 1)).slice(-2),
    day = ("0" + date.getDate()).slice(-2);
  return [date.getFullYear(), mnth, day].join("-");
}
function corverprice (str){
 return str.toLocaleString('it-IT');
}
exports.getDataproduct = async function () {
  let productlist = await product.find().populate('_idCategory');
  let list = productlist.map(sp =>{return { _id:sp._id,
    name:sp.name,price:corverprice(sp.price),published:convert(sp.published),image:sp.image,mota:sp.mota,_idCategory: sp._idCategory._id, nameCategory : sp._idCategory.name}})

  return await list;
};
exports.addproduct = async (product, res) => {
  try {
    const saveproduct = await product.save();
    if (saveproduct) {
      res.redirect("/product/all-product");
    }
    // res.json(saveproduct);
  } catch (error) {
    res.json({ messeger: error });
  }
};
exports.getDataByID = async function getDataByIDgetData(id) {
  let productlist = await productcontroller.productlist();

  let products = (await productlist.find((v) => v._id == id)) || {};
  return products;
};
exports.editData = async function editData(products, res) {
  product.findOne({ _id: products.id }, function (err, model) {
    if (err) {
      console.error("id khong ton tai");
    }
    // 2. add thong tin tu form vao model
    model.name = products.name;
    model.price = products.price;
    model.published = products.published;
    model.mota = products.mota;
    model._idCategory = products._idCategory;

    if (products.image) {
      model.image = products.image;
    }

    // 3. Kiem tra xem co anh hay khong
    // if(req.file != null){
    //   model.image = req.file.path.replace('public', '');
    // }

    // 4. luu model lai
    model.save(function (err) {
      if (err) {
        res.send("Luu khong thanh cong");
        console.log(err);
      }
      res.redirect("/product/all-product");
    });
  });
};
exports.removeData = async function removeData(id, res) {
  product.deleteOne({ _id: id }, function (err) {
    if (err) {
      res.send("Xoa khong thanh cong");
    }

    res.send({resss:true})
  });
};

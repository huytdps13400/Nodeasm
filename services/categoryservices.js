const category = require("../modal/category");
exports.getDatacategory = async function () {
  let categorylist = await category.find();

  return categorylist;
};
exports.addcategory = async (category, res) => {
  try {
    const savecategory = await category.save();
    if (savecategory) {
      res.redirect("/category/all-category");
    }
    // res.json(saveproduct);
  } catch (error) {
    res.json({ messeger: error });
  }
};
exports.getDataByID = async function getDataByIDgetData(id) {
  let categorylist = await category.find();

  let product = (await categorylist.find((v) => v._id == id)) || {};
  return product;
};
exports.editData = async function editData(product, res) {
  category.findOne({ _id: product.id }, function (err, model) {
    if (err) {
      console.error("id khong ton tai");
    }
    // 2. add thong tin tu form vao model
    model.name = product.name;
    if (product.images) {
      model.image = product.images;
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
      res.redirect("/category/all-category");
    });
  });
};
exports.removeData = async function removeData(id, res) {
  category.deleteOne({ _id: id }, function (err) {
    if (err) {
      res.send("Xoa khong thanh cong");
    }

    res.send({ress:true})
  });
};

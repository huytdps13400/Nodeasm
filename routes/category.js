var express = require("express");
var router = express.Router();
var authen = require("../ulinitites/authen");
var upload = require('../ulinitites/upload')
var midd =[upload.single('image')]

var categorycontroller = require("../controller/categorycontroller");
/* GET home page. */

router.get("/add-category", authen.authenlogin, function (req, res, next) {
  res.render("add-category");
});
router.post("/add-category",midd ,authen.authenlogin, function (req, res, next) {
  let { body ,params } = req
  if (req.file) {
    let imgUrl = req.file.originalname
    body = {...body, image: imgUrl}
  }
  categorycontroller.addCategory(body, res);
});
router.get(
  "/all-category",
  authen.authenlogin,
  async function (req, res, next) {
   let Data = await categorycontroller.categorytlist();
   res.render("all-category", { category: Data});
  }
);
router.get(
  "/all-category-send",
  categorycontroller.categorylistsend,
  function (req, res, next) {}
);
router.get('/edit-category/:id',midd ,authen.authenlogin, async function(req, res, next) {
  let id = req.params.id
  let sanpham = await categorycontroller.getDataByID(id)  
 res.render('edit-category',{category:sanpham});
});
router.post('/edit-category/:id', midd ,authen.authenlogin, function(req, res, next) {
  let id = req.params.id
  let { body  } = req
  console.log('----bodytr',body);
  if (req.file) {
    let imgUrl = req.file.originalname
    console.log(imgUrl)
    body = {...body, images: imgUrl}
  }
  categorycontroller.editData(id,body,res)

  // res.redirect('/category/all-category')
});
router.delete('/delete-category/:id',authen.authenlogin, function(req, res, next) {
  let id = req.params.id
  categorycontroller.removeData(id,res)
   // res.redirect('/category/all-category')
});

module.exports = router;

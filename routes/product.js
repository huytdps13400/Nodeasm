var express = require('express');
var router = express.Router();
var product = require('../controller/productcontroller')
var authen = require('../ulinitites/authen')
var categorycontroller = require("../controller/categorycontroller");
var productcontroller = require("../controller/productcontroller");
var upload = require('../ulinitites/upload')
var midd =[upload.single('image')]
/* GET home page. */
router.get('/add-product',authen.authenlogin, async function(req, res, next) {
  let Data = await productcontroller.productlist();
  let category = await categorycontroller.categorytlist();
  res.render('add-product',{product:Data,category});
});
router.post('/add-product',midd,authen.authenlogin, function(req, res, next) {
  let { body ,params } = req
  console.log('body',body)

  if (req.file) {
    let imgUrl = req.file.originalname
    body = {...body, image: imgUrl}
  }
  productcontroller.addproduct(body,res)
 
});
router.get('/all-product', authen.authenlogin,async function(req, res, next) {
  let Data = await productcontroller.productlist();
  let category = await categorycontroller.categorytlist();
  res.render('all-product',{product:Data,category});
 
});
router.get('/all-product-send',product.productlistsend, function(req, res, next) {

});
router.get('/edit-product/:id',midd,authen.authenlogin,async function(req, res, next) {
  let id = req.params.id
  let category = await categorycontroller.categorytlist();

  let sanpham = await productcontroller.getDataByID(id)  
res.render('edit-product',{product:sanpham,category});
});

router.post('/edit-product/:id',midd,authen.authenlogin,async function(req, res, next) {
  let id = req.params.id
  let { body  } = req
  console.log('----bodytr',body);
  if (req.file) {
    let imgUrl = req.file.originalname
    console.log(imgUrl)
    body = {...body, image: imgUrl}
  }
  productcontroller.editData(id,body,res)
});
router.delete('/delete-product/:id',authen.authenlogin, function(req, res, next) {
  let id = req.params.id
  productcontroller.removeData(id,res)
   // res.redirect('/category/all-category')
});

module.exports = router;

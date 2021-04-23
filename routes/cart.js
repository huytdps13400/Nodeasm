var express = require("express");
var router = express.Router();
var cartcontroller = require("../controller/cartcontroller");
var authen = require("../ulinitites/authen");
/* GET users listing. */
router.get("/", authen.authenlogin, async function (req, res, next) {
  let cartList = await cartcontroller.cartlist();

  res.render("all-cart", { Cart: cartList });
});
router.post("/add-cart", function (req, res, next) {
  let { body, params } = req;

  cartcontroller.addCart(body, res);
});
// router.get(
//   "/all-users-send",
//   userscontroller.userslistsend,
//   function (req, res, next) {}
// );
module.exports = router;

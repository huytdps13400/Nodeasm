var express = require("express");
var router = express.Router();
var userscontroller = require("../controller/userscontroller");
var authen = require("../ulinitites/authen");
/* GET users listing. */
router.get("/", authen.authenlogin, async function (req, res, next) {
  let DataUser = await userscontroller.userstlist();
  res.render("all-users", { Users: DataUser });
});
router.post("/add-users", function (req, res, next) {
  let { body, params } = req;

  userscontroller.addusers(body, res);
});
router.get("/all-users-send",userscontroller.userslistsend ,function (req, res, next) {
  
});
module.exports = router;

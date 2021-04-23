var cartservices = require("../services/cartservices");
const Cart = require("../modal/bill");
const {
  multipleMongooseToObject,
  mongooseToObject,
} = require("../until/mongoose");
exports.cartlist = async function (req, res) {
  return await cartservices.getDataCart();
};
exports.addCart = function addCart(req, res) {
  let { foodbill, totalprice, _idUser,published } = req;

  const cart = new Cart({
    foodbill: foodbill,
    totalprice: totalprice,
    _idUser: _idUser,
    published:published
  });
  cartservices.addCart(cart, res);
};
exports.userslistsend = async (req, res) => {
  let userslist = await Users.find({});
  res.json(userslist);
};

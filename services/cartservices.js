const cart = require("../modal/bill");
function convert(str) {
  var date = new Date(str),
    mnth = ("0" + (date.getMonth() + 1)).slice(-2),
    day = ("0" + date.getDate()).slice(-2);
  return [date.getFullYear(), mnth, day].join("-");
}
function corverprice(str) {
  return str.toLocaleString("it-IT");
}
exports.getDataCart = async function () {
  let cartlist = await cart.find().populate("_idUser");
  let dataMap = cartlist.map((v) => {
    return {
      _id: v._id,
      foodbill: v.foodbill,
      totalprice: corverprice(v.totalprice),
      published: convert(v.published),
      nameUser: v._idUser.name,
    };
  });
  console.log('list',cartlist);
  console.log(dataMap);
  return dataMap;
};
exports.addCart = async (cart, res) => {
  try {
    const savecart = await cart.save();
    if (savecart) {
      res.json({
        result: "ok",
        data: {
          foodbill: cart.foodbill,
          totalprice: cart.totalprice,
          _idUser: cart._idUser,
          published: cart.published
        },
      });
    } else {
      res.json({
        result: "failed",
        data: {},
      });
    }
    // res.json(saveproduct);
  } catch (error) {
    res.json({ messeger: error });
  }
};

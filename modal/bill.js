var mongoose = require("mongoose");
var billSchema = new mongoose.Schema({
  foodbill: {
    type: Object,
    required: true,
  },
  published: { type: String, required: true },
  totalprice: { type: String, required: true },

  _idUser: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
});
module.exports = mongoose.model("bill", billSchema, "bill");

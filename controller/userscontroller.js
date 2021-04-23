var userservices = require("../services/userservices");
const Users = require("../modal/users");
const {
  multipleMongooseToObject,
  mongooseToObject,
} = require("../until/mongoose");
exports.userstlist = async function (req, res) {
  return await userservices.getDatausers();
};
exports.addusers = function addusers(req, res) {
  let { name, email, password } = req;

  const users = new Users({
    email: email,
    password: password,
    name: name,
  });
  userservices.addusers(users, res);
};
exports.userslistsend = async (req, res) => {
  let userslist = await Users.find({});
  res.json(userslist);
};

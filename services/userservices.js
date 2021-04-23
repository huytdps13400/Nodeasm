const users = require("../modal/users");
exports.getDatausers = async function () {
  let userslist = await users.find();

  return userslist;
};
exports.addusers = async (users, res) => {
  try {
    const saveusers = await users.save();
    if (saveusers) {
      res.json({
        result: "ok",
        data: {
          name: users.name,
          email: users.email,
          password: users.password,
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

const User = require("../models/user");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const userData = req.body;

  console.log("s", userData);
  let user = new User(userData);
  console.log(user, "use");
  const Usera = await user.save((err, registeruser) => {
    {
      if (err) {
        console.log(err, "signup errr");
      } else {
        let payload = { subject: registeruser._id };
        const token = jwt.sign(payload, "secretKey");

        console.log("Success fully register");
        res.status(200).json({ token, success: true });
      }
    }
  });
};
exports.login = async (req, res) => {
  const userData = req.body;
  User.findOne({ email: userData.email }, (err, loginuser) => {
    if (err) {
      console.log(err, "adaaaaaddddd");
    } else if (!loginuser) {
      res.status(401).send("invaild email");
    } else if (loginuser.password != userData.password) {
      res.status(401).send("wrong password");
    } else {
      payload = { subject: loginuser._id };
      let token = jwt.sign(payload, "secretKey");

      console.log("Successfully login");
      res.status(200).send({ token });
    }
  });
};
exports.verifyToken = async (req, res) => {
  console.log("one");
  console.log(req, "req");
  if (!req.headers.authorization) {
    console.log("second");
    return res.status(401).send("unauthorized");
  }

  let token = req.headers.authorization.split(" ")[1];

  console.log(token, "toeknes");
  if (token === "null") {
    console.log("null token");
    res.status(401).send("unauthorized request");
  }
  let payload = jwt.verify(token, "secretKey");
  console.log(payload, "palod");
  if (!payload) {
    return res.status(401).send("Unauthotized req");
  }
  console.log("reqaff=>", req);
  req._id = payload.subject;
  next();
};

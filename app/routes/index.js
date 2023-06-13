const fs = require("fs");
const router = require("express").Router();
const { removeExtensionFromFile } = require("../middleware/utils");
const routerPath = `${__dirname}/`;

console.log(routerPath, "Asdsad");
fs.readdirSync(routerPath).filter((file) => {
  const File = removeExtensionFromFile(file);
  return File !== "index" ? router.use(`/${File}`, require(`./${File}`)) : "";
});

router.get("/", (req, res) => {
  res.render("index");
  // res.json({aaf:"asfafax"});
});

router.use("*", (req, res) => {
  res.status(404).json({
    errors: {
      msg: "URL_NOT_FOUND",
    },
  });
});

module.exports = router;

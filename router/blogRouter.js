const router = require("express").Router();
const {
  addController,
  getController,
  updateController,
  getItemController,
  updateController1,
  updateController2,
} = require("../controller/blogController");

// @route   GET api/blog/test
// @desc    Tests blog route
// @Access  Public
router.get("/test", (req, res) => res.json({ msg: "blogs works!" }));
router.get("/", getController);
router.post("/", addController);
router.get("/:id", getItemController);
router.post("/:id", updateController);
router.post("/update/:id", updateController1);

module.exports = router;

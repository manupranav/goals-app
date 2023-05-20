const express = require("express");
const router = express.Router();
const {
  getGoals,
  setGoals,
  putGoals,
  delGoals,
} = require("../controllers/goalController");
const protect = require("../middleware/authMiddleware");

router.route("/").get(protect, getGoals).post(protect, setGoals);

router.route("/:id").put(protect, putGoals).delete(protect, delGoals);

module.exports = router;

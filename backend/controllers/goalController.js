const asyncHandler = require("express-async-handler");

const Goal = require("../models/goalModel");

const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find({ user: req.user.id });
  res.status(200).json(goals);
});

const setGoals = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add a text field");
  }
  const goal = await Goal.create({
    text: req.body.text,
    user: req.user.id,
  });
  res.status(200).json(goal);
});

const putGoals = asyncHandler(async (req, res) => {
  goal = Goal.find(req.params.id);

  if (!goal) {
    res.status(400).json({ message: "Goal not found" });
  }
  const user = User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  if (goal.user.toString() !== user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }
  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updatedGoal);
});

const delGoals = asyncHandler(async (req, res) => {
  const goal = Goal.find(req.params.id);
  if (!goal) {
    res.status(400).json({ message: message.error });
  }

  const user = User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  if (goal.user.toString() !== user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  await goal.remove;
  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getGoals,
  setGoals,
  putGoals,
  delGoals,
};

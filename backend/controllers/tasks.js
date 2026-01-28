import Task from "../models/Task.js";
import User from "../models/User.js";

// Create Task
export const createTask = async (req, res) => {
  try {
    const { title, text } = req.body;
    const user = await User.findById(req.userId);

    if (text) {
      const newTaskWithText = new Task({
        username: user.username,
        title,
        text,
      });

      await newTaskWithText.save();
      await User.findByIdAndUpdate(req.userId, {
        $push: { list: newTaskWithText },
      });
      return res.json(newTaskWithText);
    }

    const newTask = new Task({
      username: user.username,
      title,
      text: "",
    });

    await newTask.save();
    await User.findByIdAndUpdate(req.userId, {
      $push: { list: newTask },
    });

    return res.json(newTask);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Что-то пошло не так!" });
  }
};

// Get All Tasks
export const getAll = async (req, res) => {
  try {
    const user = await User.findById(req.userId).populate("list");

    return res.json(user.list);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong!" });
  }
};

// Get Task By Id
export const getById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    return res.json(task);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong!" });
  }
};

// Delete Task By Id
export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    return res.json({ message: "Task was deleted." });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

// Edit Task By Id
export const editTask = async (req, res) => {
  try {
    const { title, text } = req.body;

    await Task.findByIdAndUpdate(
      req.params.id,
      {
        title,
        text,
      },
      { new: true },
    );

    return res.json({ message: "Task has been changed" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

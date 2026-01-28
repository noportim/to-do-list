import React from "react";
import { toast } from "react-toastify";
import { useAppDispatch } from "../redux/hooks";
import { createTask } from "../redux/features/task/taskSlice";
import { useNavigate } from "react-router-dom";

const AddTaskPage = () => {
  const [title, setTitle] = React.useState("");
  const [text, setText] = React.useState("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!title.trim()) return;

    try {
      dispatch(createTask({ title: title, text: text }));
      toast("Task has been added.");
      navigate("/");
    } catch (error) {
      toast("Something went wrong.");
    }

    setTitle("");
    setText("");
  };

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-44px)] bg-blue-50">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="w-full max-w-md bg-white rounded-xl shadow-lg p-6"
      >
        <h2 className="text-2xl font-semibold text-blue-600 mb-6 text-center">
          Add new task
        </h2>

        <div className="mb-4">
          <label className="block text-sm font-medium text-blue-700 mb-1">
            Title *
          </label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter task title"
            className="w-full px-4 py-2 border border-blue-200 rounded-lg
                       focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-blue-700 mb-1">
            Text
          </label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Task description (optional)"
            rows={4}
            className="w-full px-4 py-2 border border-blue-200 rounded-lg
                       focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
          />
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            onClick={handleSubmit}
            className="px-8 py-2 bg-blue-600 text-white rounded-lg
                       hover:bg-blue-700 transition-colors
                       disabled:opacity-50"
            disabled={!title.trim()}
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTaskPage;

import React from "react";
import { FaSave, FaArrowLeft } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { useParams, useNavigate } from "react-router-dom";
import { getTask, editTask } from "../redux/features/task/taskSlice";
import { toast } from "react-toastify";

const EditTaskPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { currentTask } = useAppSelector((state) => state.task);

  const [title, setTitle] = React.useState("");
  const [text, setText] = React.useState("");

  React.useEffect(() => {
    if (id) {
      dispatch(getTask(id));
    }
  }, [dispatch, id]);

  React.useEffect(() => {
    if (currentTask) {
      setTitle(currentTask.title);
      setText(currentTask.text ?? "");
    }
  }, [currentTask]);

  const handleSave = () => {
    dispatch(
      editTask({
        id: id!,
        title,
        text,
      }),
    );
    navigate("/");
    toast("Task has been changed");
  };

  return (
    <div className="min-h-screen bg-blue-50 p-6">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-blue-600 mb-4 hover:underline"
      >
        <FaArrowLeft /> Назад
      </button>

      <div className="bg-white p-6 rounded shadow">
        <input
          className="w-full mb-4 p-3 border rounded focus:ring-2 focus:ring-blue-400"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />

        <textarea
          className="w-full p-3 border rounded focus:ring-2 focus:ring-blue-400"
          rows={6}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Text"
        />

        <button
          onClick={handleSave}
          className="mt-4 flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          <FaSave /> Save
        </button>
      </div>
    </div>
  );
};

export default EditTaskPage;

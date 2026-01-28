import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft, FaEdit, FaTrash } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { getTask, deleteTask } from "../redux/features/task/taskSlice";
import { toast } from "react-toastify";

const TaskPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    if (id) {
      dispatch(getTask(id));
    }
  }, [dispatch, id]);

  const { currentTask } = useAppSelector((state) => state.task);

  if (!currentTask) return <div className="p-6">Задача не найдена</div>;

  const handleDelete = async () => {
    if (confirm("Удалить задачу?")) {
      await dispatch(deleteTask(id));
      navigate("/");
      toast("Task was deleted.");
    }
  };

  return (
    <div className="min-h-[calc(100vh-44px)] bg-blue-50 p-6 flex flex-col">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-blue-600 mb-4 hover:underline"
      >
        <FaArrowLeft /> Назад
      </button>

      <div className="bg-white p-6 rounded shadow flex-1">
        <h1 className="text-2xl font-bold text-blue-800 mb-4">
          {currentTask?.title}
        </h1>
        <p className="text-gray-700 whitespace-pre-wrap">{currentTask?.text}</p>
      </div>

      <div className="mt-6 flex justify-between">
        <button
          onClick={() => navigate(`/task/${id}/edit`)}
          className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          <FaEdit /> Edit
        </button>

        <button
          onClick={handleDelete}
          className="flex items-center gap-2 px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
        >
          <FaTrash /> Delete
        </button>
      </div>
    </div>
  );
};

export default TaskPage;

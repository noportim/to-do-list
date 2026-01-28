import React from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { getAllTasks } from "../redux/features/task/taskSlice";

const MainPage = () => {
  const dispatch = useAppDispatch();
  const { tasks } = useAppSelector((state) => state.task);

  React.useEffect(() => {
    dispatch(getAllTasks());
  }, [dispatch]);

  return (
    <div className="min-h-[calc(100vh-44px)] bg-blue-50 p-6">
      <h1 className="text-2xl font-bold text-blue-800 mb-4">Список задач</h1>
      <ul className="space-y-3">
        {tasks &&
          tasks.map((task, i) => (
            <li key={i}>
              <Link
                to={`/task/${task._id}`}
                className="block p-4 bg-white rounded shadow hover:bg-blue-100 transition"
              >
                {task.title}
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default MainPage;

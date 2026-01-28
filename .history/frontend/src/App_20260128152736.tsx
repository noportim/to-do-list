import React from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useAppDispatch } from "./redux/hooks";
import { getMe } from "./redux/features/auth/authSlice";

import Loyout from "./components/Loyout";
import MainPage from "./pages/MainPage";
import TaskPage from "./pages/TaskPage";
import AddTaskPage from "./pages/AddTaskPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import EditTaskPage from "./pages/EditTaskPage";

function App() {
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  return (
    <Loyout>
      <Routes>
        <Route path="register" element={<RegisterPage />} />
        <Route path="login" element={<LoginPage />} />

        <Route element={}
        <Route path="/" element={<MainPage />} />
        <Route path="task/:id" element={<TaskPage />} />
        <Route path="task/:id/edit" element={<EditTaskPage />} />
        <Route path="new" element={<AddTaskPage />} />
      </Routes>

      <ToastContainer position="bottom-right" />
    </Loyout>
  );
}

export default App;

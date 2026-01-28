import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { isCheckAuth, logout } from "../redux/features/auth/authSlice";
import { toast } from "react-toastify";

const Navbar = () => {
  const isAuth = useAppSelector(isCheckAuth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(logout());
    window.localStorage.removeItem("token");
    navigate("/login");
    toast("Вы вышли из системы");
  };

  const activeStyle = {
    color: "black",
  };

  return (
    <div className="navbar flex justify-center relative py-2.5 bg-blue-50">
      {isAuth && (
        <ul className="flex">
          <li className="px-1.75">
            <NavLink
              to={"/"}
              className={"text-gray-600"}
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              Главная
            </NavLink>
          </li>
          <li className="px-1.75">
            <NavLink
              to={"/new"}
              className={"text-gray-600"}
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              Добавить задачу
            </NavLink>
          </li>
        </ul>
      )}

      <div className="relative left-[35%]">
        {isAuth && (
          <button
            onClick={logoutHandler}
            // className="px-6 py-2 bg-blue-600 text-white rounded-lg
            //            hover:bg-blue-700 transition-colors"
          >
            Выйти
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;

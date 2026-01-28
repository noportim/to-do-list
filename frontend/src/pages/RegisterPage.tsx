import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { isCheckAuth, registerUser } from "../redux/features/auth/authSlice";
import { toast } from "react-toastify";

const RegisterPage = () => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { status } = useAppSelector((state) => state.auth);
  const isAuth = useAppSelector(isCheckAuth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (status) {
      toast(status);
    }
    if (isAuth) {
      navigate("/");
    }
  }, [status, isAuth, navigate]);

  const handleSubmit = () => {
    try {
      dispatch(registerUser({ username, password }));
      setPassword("");
      setUsername("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      className="min-h-[calc(100vh-20px)] flex items-center justify-center bg-blue-50"
      onSubmit={(e) => e.preventDefault()}
    >
      <div className="bg-white w-90 rounded-2xl p-8 shadow-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Hello!</h1>

        <p className="text-gray-500 mb-8">Sign Up to Get Started</p>

        <div className="space-y-5">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-6 py-4 rounded-full border-2 border-gray-300 focus:outline-none focus:border-blue-600 text-gray-700"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-6 py-4 rounded-full border-2 border-gray-300 focus:outline-none focus:border-blue-600 text-gray-700"
          />
        </div>

        <button
          type="submit"
          onClick={handleSubmit}
          className="w-full mt-6 py-4 rounded-full bg-blue-600 text-white text-lg font-medium hover:bg-blue-700 transition"
        >
          Sing Up
        </button>

        <div className="mt-6 text-center text-gray-600">
          Have an account?
          <Link
            to={"/login"}
            className="text-blue-600 font-semibold hover:underline"
          >
            Login
          </Link>
        </div>
      </div>
    </form>
  );
};
export default RegisterPage;

import { useState } from "react";
import { Link } from "react-router-dom";
import useLogin from "../../Hooks/useLogin";
import { loginBg } from "../../Assets";

const Login = () => {
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");

  const { loading, login } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(userEmail, password);
  };

  return (
    <div
      className="bg-cover h-full py-10 flex items-center justify-center "
      style={{ backgroundImage: `url(${loginBg})` }}
    >
      <div className="sm:w-[420px] w-[300px] mx-auto">
        <div className="w-full p-8 rounded-lg shadow-md bg-white bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
          <h1 className="text-3xl font-semibold text-center text-blue-600">
            Login
            <span className="text-header"> Project Crackers</span>
          </h1>

          <form
            className="mt-5 flex flex-col gap-3 text-white"
            onSubmit={handleSubmit}
          >
            <div>
              <label className="label">
                <span className="text-base label-text text-white">
                  User Email
                </span>
              </label>
              <input
                type="text"
                placeholder="Enter user email"
                className="w-full pl-4 text-[15px] bg-white rounded-[10px] text-header border-none outline-none h-10"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="label">
                <span className="text-base text-white label-text">
                  Password
                </span>
              </label>
              <input
                type="password"
                placeholder="Enter password"
                className="w-full pl-4 text-[15px] bg-white rounded-[10px] text-header border-none outline-none h-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Link
              to="/signup"
              className="text-sm  hover:underline hover:text-blue-600 mt-2 inline-block"
            >
              {"Don't"} have an account?
            </Link>

            <div>
              <button
                className="bg-white text-header w-full py-1 rounded-[10px] hover:bg-gray-200 transition-all duration-300 mt-2"
                disabled={loading}
              >
                {loading ? (
                  <span className="loading loading-spinner "></span>
                ) : (
                  "Login"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Login;

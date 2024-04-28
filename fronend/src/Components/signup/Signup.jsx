import { Link } from "react-router-dom";
import GenderCheckbox from "./GenderCheckbox";
import { useState } from "react";
import useSignup from "../../Hooks/useSignup";
import { signupBg } from "../../Assets";
import { UseScrollTop } from "../../Hooks/useScrollTop";

const SignUp = () => {
  const [inputs, setInputs] = useState({
    fullName: "",
    userEmail: "",
    password: "",
    confirmPassword: "",
    userMobile: "",
    shopName: "",
    shopAddress: "",
    url: "",
    gender: "",
  });

  const handleCheckBoxChange = (gender) => {
    setInputs({ ...inputs, gender });
  };

  const { loading, signup } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(inputs);
  };

  return (
    <div
      className="bg-cover h-full py-10 flex items-center justify-center "
      style={{ backgroundImage: `url(${signupBg})` }}
    >
      <UseScrollTop />
      <div className="sm:w-[550px] w-[300px] mx-auto">
        <div className="w-full p-8 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
          <h1 className="text-3xl font-semibold text-center text-header">
            Join As Dropshipper
          </h1>

          <form
            className="mt-5 flex flex-col gap-3 text-white"
            onSubmit={handleSubmit}
          >
            <div className="grid sm:grid-cols-2 gap-y-2 gap-x-4">
              <div>
                <label className="label">
                  <span className="text-base text-white label-text">
                    Full Name
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="w-full pl-4 text-[15px] bg-white rounded-[10px] text-header border-none outline-none h-10"
                  value={inputs.fullName}
                  onChange={(e) =>
                    setInputs({ ...inputs, fullName: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="label">
                  <span className="text-base text-white label-text">
                    User Email
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="Enter user email"
                  className="w-full pl-4 text-[15px] bg-white rounded-[10px] text-header border-none outline-none h-10"
                  value={inputs.userEmail}
                  onChange={(e) =>
                    setInputs({ ...inputs, userEmail: e.target.value })
                  }
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
                  value={inputs.password}
                  onChange={(e) =>
                    setInputs({ ...inputs, password: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="label">
                  <span className="text-base text-white label-text">
                    Confirm Password
                  </span>
                </label>
                <input
                  type="password"
                  placeholder="Confirm password"
                  className="w-full pl-4 text-[15px] bg-white rounded-[10px] text-header border-none outline-none h-10"
                  value={inputs.confirmPassword}
                  onChange={(e) =>
                    setInputs({ ...inputs, confirmPassword: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="label">
                  <span className="text-base text-white label-text">
                    Mobile Number
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="Enter mobile no"
                  className="w-full pl-4 text-[15px] bg-white rounded-[10px] text-header border-none outline-none h-10"
                  value={inputs.userMobile}
                  onChange={(e) =>
                    setInputs({ ...inputs, userMobile: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="label">
                  <span className="text-base text-white label-text">
                    Name of Your Shop
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="Enter your shop name"
                  className="w-full pl-4 text-[15px] bg-white rounded-[10px] text-header border-none outline-none h-10"
                  value={inputs.shopName}
                  onChange={(e) =>
                    setInputs({ ...inputs, shopName: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="label">
                  <span className="text-base text-white label-text">
                    Business / Shop Address
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="Enter shop address"
                  className="w-full pl-4 text-[15px] bg-white rounded-[10px] text-header border-none outline-none h-10"
                  value={inputs.shopAddress}
                  onChange={(e) =>
                    setInputs({ ...inputs, shopAddress: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="label">
                  <span className="text-base text-white label-text">
                    Website or Page URL
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="Enter website or page URL"
                  className="w-full pl-4 text-[15px] bg-white rounded-[10px] text-header border-none outline-none h-10"
                  value={inputs.url}
                  onChange={(e) =>
                    setInputs({ ...inputs, url: e.target.value })
                  }
                />
              </div>
            </div>

            <GenderCheckbox
              onCheckboxChange={handleCheckBoxChange}
              selectedGender={inputs.gender}
            />

            <Link
              to="/login"
              className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block"
            >
              Already have an account?
            </Link>
            <p className="py-5 text-xl bg-white text-center text-header">
              Dropshipper Signup Fee: 3,000.00 ৳
            </p>
            <div>
              <button
                className="bg-white text-xl text-header w-full py-3 rounded-[10px] hover:bg-gray-200 transition-all duration-300 mt-2"
                disabled={loading}
              >
                {loading ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  "Join as Dropshipper"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default SignUp;

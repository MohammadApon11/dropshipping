import { Link } from "react-router-dom";
import { HiOutlineXMark } from "react-icons/hi2";

export default function Fail() {
  const searchData = new URLSearchParams(window.location.search);
  const message = searchData.get("message");
  return (
    <div className="px-5">
      <div className="mx-auto my-5 bg-white shadow-lg max-w-[500px] px-[50px] py-[40px]">
        <div className="flex flex-col items-center justify-center">
          <div className="flex items-center justify-center bg-red-200 text-red-500 md:text-7xl text-4xl  rounded-full md:w-[150px] w-[100px] md:h-[150px] h-[100px]">
            <HiOutlineXMark />
          </div>
          <h1 className="text-red-500 text-5xl font-bold md:mt-12 mt-6">
            Failed
          </h1>
          <p className="text-gray-600 text-center md:mt-4 mt-2">
            Your order confirmation was failed{" "}
            <Link className="text-[#007bff]" to="/cart">
              Please try again!
            </Link>
          </p>
          <span className="text-[14px] text-gray-600">
            <span className="font-semibold">Failed Reason:</span> {message}
          </span>
          <Link className="text-[#007bff] md:mt-5 mt-3" to="/">
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}

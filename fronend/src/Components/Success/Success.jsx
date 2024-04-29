import { Link } from "react-router-dom";
import { VscCheck } from "react-icons/vsc";

export default function Success() {
  const searchData = new URLSearchParams(window.location.search);
  const trxID = searchData.get("trxID");
  return (
    <div className="px-5">
      <div className="flex items-center my-8 mx-auto bg-white shadow-lg max-w-[500px] px-[50px] py-[40px]">
        <div className="flex flex-col items-center justify-center">
          <div className="flex items-center justify-center bg-green-200 text-green-600 md:text-7xl text-4xl md:w-[150px] w-[100px] md:h-[150px] h-[100px] rounded-full">
            <VscCheck />
          </div>
          <h1 className="text-green-600 text-5xl font-bold md:mt-12 mt-6">
            Success
          </h1>
          <p className="text-gray-600 text-center md:mt-4 mt-2">
            We recieved your order confirmation request we'll be in touch shortly!
          </p>
          <span className="text-[14px] text-gray-600">
            <span className="font-semibold">Tranjection id:</span> <span className="underline">{trxID}</span>
          </span>
          <Link className="text-[#007bff] md:mt-5 mt-2" to="/">
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}

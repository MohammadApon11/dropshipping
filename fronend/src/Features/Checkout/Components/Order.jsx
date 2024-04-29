import React, { useEffect, useState } from "react";
import PaymentMd from "../../../Components/Modal/PaymentMd";
import Btn from "../../../Components/Share/Btn";
import { useGlobalCtx } from "../../../Contexts/GlobalProvider";
import { TbRow } from "./Handler";

export default function Order() {
  const { product, setProduct, setTotalPrice } = useGlobalCtx();
  const [deliverCharge, setDeliverCharge] = useState(50);

  return (
    <div>
      <div className="border border-border border-opacity-5 rounded-[0.5rem] py-4 px-5">
        <h1 className="text-textHeader text-xl pb-4 border-b">Your order</h1>
        <table className="w-full">
          <tbody>
            <tr className="border-b">
              <td className="pt-5 pb-2 text-base font-semibold text-black">
                Product
              </td>
              <td className="pt-5 pb-2 text-base font-semibold text-black text-right">
                Subtotal
              </td>
            </tr>
            <TbRow
              uniqueKey={product?._id}
              key={product?._id}
              label={product?.name}
            >
              ৳ {product?.price} TK{" "}
            </TbRow>
            <TbRow label="Subtotal">
              <p className="text-black">
                ৳ {product?.quantity * product?.price}
                TK{" "}
              </p>
            </TbRow>
          </tbody>
        </table>
        <p className="py-5 text-pColor">Shipping</p>
        <div className="space-y-2 border-b border-border border-opacity-5 pb-5">
          <div className="flex items-center justify-between text-pColor">
            <label className="flex items-center">
              <input
                type="radio"
                name="shipping"
                defaultChecked
                className="mr-2 accent-yellow-400 outline-none border-none"
                value="1"
                onClick={() => setDeliverCharge(50)}
              />
              Inside Dhaka
            </label>
            <p className="text-black">৳50.00tk </p>
          </div>
          <div className="flex items-center justify-between text-pColor">
            <label className="flex items-center">
              <input
                type="radio"
                name="shipping"
                className="mr-2 accent-yellow-400"
                value="2"
                onClick={() => setDeliverCharge(100)}
              />
              Outside Dhaka
            </label>
            <p className="text-black">৳ 100.00tk </p>
          </div>
        </div>
        <div className="flex justify-between py-5">
          <p className="text-black text-base font-normal">Estimated Total</p>
          <p className="font-bold text-xl text-textHeader">
            ৳ {product?.quantity * product?.price + deliverCharge} TK{" "}
          </p>
        </div>
        <button
          onClick={() =>
            setTotalPrice(product?.quantity * product?.price + deliverCharge)
          }
          className="btn w-full bg-header hover:bg-header text-white"
        >
          Confirm Payment
        </button>
        {/* {open ? <PaymentMd /> : ""} */}
      </div>
    </div>
  );
}

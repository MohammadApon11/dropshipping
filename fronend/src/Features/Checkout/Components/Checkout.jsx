import React from "react";
import { useForm } from "react-hook-form";
import { useGlobalCtx } from "../../../Contexts/GlobalProvider";
import Contact from "./Contact";
import Order from "./Order";
import axios from "axios";
import { baseURL } from "../../../Utils";

function Checkout() {
  const { totalPrice } = useGlobalCtx();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (formData) => {
    const orderId = Math.random() * 10 + 1;
    try {
      const { data } = await axios.post(
        `${baseURL}/api/bkash/payment/create`,
        {
          ...formData,
          totalPrice,
          orderId,
        },
        { withCredentials: true }
      );
      window.location.href = data.bkashURL;
    } catch (error) {
      console.log(error?.response?.data);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-12 gap-x-8 py-12">
        <div className="col-span-7">
          <Contact register={register} errors={errors} />
        </div>
        <div className="col-span-5 ">
          <Order />
        </div>
      </div>
    </form>
  );
}
export default Checkout;

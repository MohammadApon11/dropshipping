import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Rating, Star } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { FaCartPlus } from "react-icons/fa";
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { FaCheckCircle } from "react-icons/fa";
import { MdOutlineDiscount } from "react-icons/md";
import { UseScrollTop } from "../../Hooks/useScrollTop";
import useGetProductsProductById from "../../Hooks/useGetProductByProductId";
import useGetAllCartProductByUserEmail from "../../Hooks/useGetAllCartProductByUserEmail";
import SectionWraper from "../Wrapper's/SectionWraper";
import { useAuthContext } from "../../Contexts/AuthContext";
import { baseURL } from "../../Utils";
import CommonHero from "../Hero's/CommonHero";
import useAddToCart from "../../Hooks/useAddToCart";

const customStyles = {
  itemShapes: Star,
  activeFillColor: "#ffde37",
  inactiveFillColor: "#fff2b1",
};
const customStyles2 = {
  itemShapes: Star,
  activeFillColor: "#ffde37",
  inactiveFillColor: "gray",
};

const AddCart = () => {
  const [ratings, setRating] = useState(0);
  const { productId } = useParams();
  const { product } = useGetProductsProductById(productId);
  const { authUser } = useAuthContext();
  const [targetImage, setTargetImage] = useState(null);
  const [showAllReviews, setShowALlReviews] = useState(false);
  const navgate = useNavigate();
  const { addToCart, loading, error, cartItem } = useAddToCart();

  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    if (!authUser) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please login first!",
      });
      return navgate("/login");
    }

    if (data.review === "") {
      return toast("Please type your review", {
        icon: "⚠️",
      });
    }
    const reviews = {
      ...data,
      ratings: ratings,
      email: authUser?.userEmail || "anonymous@example.com",
      name: authUser?.fullName || "Anonymous",
      image:
        authUser?.profilePic ||
        "https://img.freepik.com/free-vector/mysterious-gangster-character-illustration_23-2148460670.jpg?w=740&t=st=1708429998~exp=1708430598~hmac=eab247ca0be45bdc32c66d666374b0c1d7094ebac068d3d536ff24c466fb99c4",
      createdAt: new Date().toLocaleDateString(),
    };

    axios.put(`${baseURL}/api/product/${product._id}`, reviews).then((res) => {
      if (res.data.success) {
        reset();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your review has been saved!",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  const { allCartProduct } = useGetAllCartProductByUserEmail(
    authUser?.userEmail
  );

  const isAlreadyAddedToCart = allCartProduct?.find(
    (cartData) => cartData?.productId === productId
  );

  const handleAddToCart = () => {
    if (!authUser) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please login first!",
      });
      return navgate("/login");
    }
    if (authUser?.userEmail) {
      addToCart(product._id, authUser?.userEmail);
    }
  };

  return (
    <SectionWraper>
      <UseScrollTop />
      <CommonHero product={product} />

      <div className="grid grid-cols-12 gap-x-4 border p-4">
        <div className="col-span-5">
          <div className="max-w-full h-[300px] relative overflow-hidden rounded-2xl">
            <img
              className="p-2 w-full h-full rounded-3xl"
              src={targetImage === null ? product?.image : targetImage}
              alt=""
            />
          </div>
          <div className="grid grid-cols-4 mt-[40px] ml-2">
            {product?.subImages?.map((image, index) => (
              <div className="border p-2 h-[80px]" key={index}>
                <img
                  key={index}
                  className="cursor-pointer w-full h-full rounded-lg"
                  onClick={() => setTargetImage(image)}
                  src={image}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="col-span-7 text-black">
          <h4 className="text-[28px] uppercase">{product?.name}</h4>
          <div className="border-b border-dotted pb-2">
            <div className="flex items-center gap-3">
              <Rating
                style={{ maxWidth: 80 }}
                value={product?.ratings}
                readOnly
                itemStyles={customStyles}
              />
              <span className="text-[14px] text-[#f90] py-2">
                ({`${product?.reviews?.length} customer reviews`})
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-gray-400 text-[15px]">
                Brand: <span className="text-[#f90]">{product?.brand}</span>
              </span>
              <span className="text-gray-400 text-[15px]">
                Shop: <span className="text-[#f90]">{product?.shop}</span>
              </span>
            </div>
          </div>
          <div className="border-b border-dotted py-3">
            <p>
              <span className="text-[#f90] font-semibold text-[28px]">
                {" "}
                ${product?.price}
              </span>
              {"  "}
              <del className="text-[16px] text-gray-400">
                ${product?.price + 20}
              </del>
            </p>
            <span className="flex items-center gap-1 mt-2 text-[15px]">
              <FaCheckCircle className="text-[#f90]" /> In Stock: (
              {product?.available_quantity}+ available)
            </span>
          </div>
          <div className="flex items-center gap-2 mt-[20px]">
            {isAlreadyAddedToCart ? (
              <Link
                to={"/cart"}
                className={`rounded-[24px] flex items-center justify-center gap-2 w-[400px] h-[50px]  text-white transition-all duration-300 ${
                  isAlreadyAddedToCart
                    ? "bg-[#f90] hover:text-white shadow-md"
                    : "hover:bg-[#ff8000] bg-[#f90]"
                }`}
              >
                <FaCartPlus className="text-[20px]" />
                Go to Cart ➞
              </Link>
            ) : (
              <button
                onClick={handleAddToCart}
                className={`rounded-[24px] text-white flex items-center justify-center gap-2 w-[400px] h-[50px] transition-all duration-300 hover:bg-[#ff8000] bg-[#f90]`}
              >
                <FaCartPlus className="text-[20px]" />
                Add to cart
              </button>
            )}
          </div>
          <ul className="text-[15px] mt-[40px] flex flex-col gap-2">
            <li className="flex items-center gap-2">
              <img
                className="w-[19px]"
                src="/icons/happy-return-new.png"
                alt=""
              />{" "}
              Free Worldwide Shipping
            </li>
            <li className="flex items-center gap-2">
              <img className="w-[18px]" src="/icons/money-hand.png" alt="" /> 30
              Days Return
            </li>
            <li className="flex items-center gap-2">
              <MdOutlineDiscount className="text-[17px]" /> Member Discount
            </li>
          </ul>
          <p className="mt-3 text-[15px]">{product?.description}</p>
        </div>
      </div>

      <div className="">
        <div className="bg-[#f90] flex items-center justify-center w-[140px] h-[60px] text-white text-[17px] rounded-t-md">
          Reviews ({product?.reviews?.length})
        </div>
        <div className="grid grid-cols-12 bg-white border p-[24px] pt-[40px] text-black">
          <div className="col-span-7">
            <span className="text-[20px]">
              {product?.reviews?.length} review For {product?.name}
            </span>
            <div className="pb-6">
              {showAllReviews
                ? product?.reviews?.map((item, index) => (
                    <div
                      className="flex items-center gap-4 mt-[30px]"
                      key={index}
                    >
                      <img
                        className="rounded-[50%] w-[65px] h-[65px]"
                        src={item?.image}
                        alt=""
                      />
                      <div>
                        <span>
                          {item?.name} -{" "}
                          <span className="text-[15px]">{item?.createdAt}</span>
                        </span>
                        <Rating
                          style={{ maxWidth: 80 }}
                          value={item?.ratings}
                          readOnly
                          itemStyles={customStyles}
                        />
                        <p className="mt-[10px] text-[15px]">{item?.review}</p>
                      </div>
                    </div>
                  ))
                : product?.reviews?.map(
                    (item, index) =>
                      index <= 4 && (
                        <div
                          className="flex items-center gap-4 mt-[30px] transition-all duration-300"
                          key={index}
                        >
                          <img
                            className="rounded-[50%] w-[65px] h-[65px]"
                            src={item?.image}
                            alt=""
                          />
                          <div>
                            <span>
                              {item?.name} -{" "}
                              <span className="text-[15px]">
                                {item?.createdAt}
                              </span>
                            </span>
                            <Rating
                              style={{ maxWidth: 80 }}
                              value={item?.ratings}
                              readOnly
                              itemStyles={customStyles}
                            />
                            <p className="mt-[10px] text-[15px]">
                              {item?.review}
                            </p>
                          </div>
                        </div>
                      )
                  )}
              {product?.reviews?.length > 5 && (
                <div className="border-t border-b text-center py-3 mt-5 text-[#f90] ">
                  <span
                    className="cursor-pointer"
                    onClick={() => setShowALlReviews(!showAllReviews)}
                  >
                    {showAllReviews ? "Show Less" : "Show All Review(s)"}
                  </span>
                </div>
              )}
            </div>
          </div>
          <div className="col-span-5">
            <div className="mt-[40px] border-b text-[20px] pb-3">
              Add a review
            </div>
            <div className="mt-[50px]">
              <span className="text-[15px]">
                Your rating <span className="text-[#f90]">*</span>
              </span>
              <Rating
                style={{ maxWidth: 80 }}
                value={ratings}
                onChange={setRating}
                itemStyles={customStyles2}
              />
              <form
                className="m-0 max-w-full mt-[30px]"
                onSubmit={handleSubmit(onSubmit)}
              >
                <textarea
                  className="h-[120px] w-full bg-transparent border rounded-md outline-none p-[15px]"
                  {...register("review")}
                ></textarea>
                <button className="bg-[#f90] text-white px-5 rounded-md py-1 hover:bg-[#ff8000]">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </SectionWraper>
  );
};

export default AddCart;

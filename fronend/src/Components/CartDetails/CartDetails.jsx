import SVGIcon from "../Share/SVGIcon";
import {
  Moneyback,
  Original,
  Purchase,
  Replacement,
  Return,
} from "../../Assets";
import SectionWraper from "../Wrapper's/SectionWraper";
import useGetAllCartProductByUserEmail from "../../Hooks/useGetAllCartProductByUserEmail";
import { useAuthContext } from "../../Contexts/AuthContext";
import { FaRegTrashAlt, FaRegHeart } from "react-icons/fa";
import { FaPlus, FaMinus } from "react-icons/fa6";
import { UseScrollTop } from "../../Hooks/useScrollTop";
import useDeleteCartProduct from "../../Hooks/useDeleteCartProduct";
import Swal from "sweetalert2";
import { useGlobalCtx } from "../../Contexts/GlobalProvider";
import useAddToWishlist from "../../Hooks/useAddToWishlist";
import useUpdateQuantity from "../../Hooks/useUpdateQuantity";
import { useState } from "react";

export default function CartDetails() {
  const { authUser } = useAuthContext();
  const { allCartProduct, loading } = useGetAllCartProductByUserEmail(
    authUser?.userEmail
  );
  const [LoadingId, setLoadingId] = useState("");
  const { updateCart } = useGlobalCtx();
  const { deleteCartProduct } = useDeleteCartProduct();

  const handleDelete = async (productId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this cart item? This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      const response = await deleteCartProduct(productId);

      if (response?.message) {
        Swal.fire({
          title: "Deleted!",
          text: "The cart item has been deleted.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
      }
      updateCart();
    } else if (result.isDismissed) {
      Swal.fire({
        title: "Cancelled",
        text: "The cart item was not deleted.",
        icon: "info",
        timer: 1500,
        showConfirmButton: false,
      });
    }
  };
  const { addToWishlist } = useAddToWishlist();

  const handleAddToWishlist = async (productId) => {
    const result = await Swal.fire({
      title: "Add to wishlist?",
      text: "Do you want to add this product to your wishlist? It will be removed from the cart.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, add it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      const response = await addToWishlist(productId, authUser?.userEmail);

      if (response?.message) {
        Swal.fire({
          title: "Added!",
          text: "The product has been added to your wishlist and removed from your cart.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });

        updateCart();
      }
    }
  };

  const { updateQuantity, loadingQuantity1, loadingQuantity2, error } =
    useUpdateQuantity();

  const handleUpdateQuantity = async (action, item) => {
    const response = await updateQuantity(action, item?._id);
    setLoadingId(item?._id);
    if (action === "minus" && item?.quantity <= 1) {
      Swal.fire({
        title: "Warning!",
        text: "Cannot reduce quantity below 1",
        icon: "question",
      });
      return; // Exit early
    }
    if (response?.cartItem) {
      updateCart(); // Callback to update the cart or trigger a re-render
    }
  };

  return (
    <SectionWraper>
      <UseScrollTop />
      <div className="grid grid-cols-12 gap-x-5 py-10">
        <div className="col-span-9 border flex flex-col gap-7 p-8">
          {allCartProduct?.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-5">
                <img className="w-40 rounded-md" src={item?.image} alt="" />
                <div>
                  <p className="text-xl">{item?.name}</p>
                  <p className="text-[14px]">{item?.brand}</p>
                  <div className="flex items-center gap-5 mt-3">
                    <FaRegTrashAlt
                      onClick={() => handleDelete(item?._id)}
                      className="text-xl cursor-pointer hover:text-red-500 transition-all duration-300"
                    />
                    <div className="flex items-center gap-2 cursor-pointer hover:text-[#f90] transition-all duration-300">
                      <FaRegHeart
                        onClick={() => handleAddToWishlist(item?.productId)}
                        className="text-xl"
                      />
                      <p className="text-[15px]">Wishlists</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-20">
                <div className="flex items-center">
                  <div
                    onClick={() => handleUpdateQuantity("minus", item)}
                    className={`bg-gray-200 w-8 h-8 flex items-center justify-center cursor-pointer ${
                      loadingQuantity1 && LoadingId === item?._id
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                  >
                    {loadingQuantity1 && LoadingId === item?._id ? (
                      <span className="animate-spin text-sm cursor-wait">
                        ↻
                      </span>
                    ) : (
                      <FaMinus />
                    )}
                  </div>
                  <div className="w-8 h-8 flex items-center justify-center bg-white border-t border-b">
                    {item?.quantity}
                  </div>
                  <div
                    onClick={() => handleUpdateQuantity("plus", item)}
                    className={`bg-gray-200 w-8 h-8 flex items-center justify-center cursor-pointer ${
                      loadingQuantity2 && LoadingId === item?._id
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                  >
                    {loadingQuantity2 && LoadingId === item?._id ? (
                      <span className="animate-spin text-sm cursor-wait">
                        ↻
                      </span>
                    ) : (
                      <FaPlus />
                    )}
                  </div>
                </div>
                <div className="">
                  <p>${item?.quantity * item?.price}</p>
                  <del className="text-[#f90]">
                    ${item?.quantity * item?.regularPrice}
                  </del>
                </div>
                <button className="btn bg-header text-white hover:bg-header">
                  Confirm Order
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="col-span-3 text-[15px]">
          <div className="border h-[250px]  flex flex-col gap-5 p-6">
            <div className="flex items-center gap-2">
              <SVGIcon Icon={Return} /> <p>Cash on Delivery Available</p>
            </div>
            <div className="flex items-center gap-2">
              <SVGIcon Icon={Replacement} /> <p>7 Days Replacement Policy</p>
            </div>
            <div className="flex items-center gap-2">
              <SVGIcon Icon={Moneyback} /> <p>100% Money Back Guarantee</p>
            </div>
            <div className="flex items-center gap-2">
              <SVGIcon Icon={Purchase} /> <p>Purchase & Earn Points</p>
            </div>
            <div className="flex items-center gap-2">
              <SVGIcon Icon={Original} /> <p>100% Original Product</p>
            </div>
          </div>
        </div>
      </div>
    </SectionWraper>
  );
}

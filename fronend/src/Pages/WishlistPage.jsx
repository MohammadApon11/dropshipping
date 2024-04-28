import React from "react";
import CommonHero from "../Components/Hero's/CommonHero";
import { useAuthContext } from "../Contexts/AuthContext";
import useGetAllWishlist from "../Hooks/useGetAllWishlist";

export default function WishlistPage() {
  const { authUser } = useAuthContext();
  const { allWishlistProduct } = useGetAllWishlist(authUser?.userEmail);

  return (
    <>
      <CommonHero />
      <div className="py-10 flex flex-col w-[800px] mx-auto">
        {allWishlistProduct?.items?.map((item, index) => (
          <div className="border flex items-center justify-between p-4">
            <div className="flex items-center gap-5">
              <img src={item?.image} className="w-40 rounded-md" alt="" />
              <div>
                <p className="text-xl">{item?.name}</p>
                <p className="text-[15px]">{item?.brand}</p>
              </div>
            </div>
            <div className="border-l-4 border-t border-r border-green-500 border-b-4 rounded-xl px-2">In Stock</div>
            <div>
              <p>${item?.price}</p>
              <del className="text-[#f90]">${item?.regularPrice}</del>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

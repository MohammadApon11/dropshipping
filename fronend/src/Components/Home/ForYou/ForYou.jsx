import useGetAllProducts from "../../../Hooks/useGetAllProducts";
import SingleProduct from "../../Products/SingleProduct";
import SectionWraper from "../../Wrapper's/SectionWraper";

const ForYou = () => {
  const { products, loading, error } = useGetAllProducts();
  const forYouProdcuts = products.filter((product) => product?.forYou === true);

  return (
    <SectionWraper>
      <h3 className="text-black text-[24px] mb-[15px]">Just for you!</h3>
      <div className="mt-4 grid xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1">
        {loading
          ? "Please Wait..."
          : forYouProdcuts?.map((product, index) => (
              <SingleProduct key={index} index={index} product={product} />
            ))}
      </div>
    </SectionWraper>
  );
};

export default ForYou;

import SingleProduct from "../../Products/SingleProduct";
import useGetAllProducts from "../../../Hooks/useGetAllProducts";
import SectionWraper from "../../Wrapper's/SectionWraper";

const FlashSale = () => {
  const { products, loading, error } = useGetAllProducts();
  const flashSaleProdcuts = products.filter(
    (product) => product?.flashSale === true
  );
  return (
    <SectionWraper>
      <h3 className="text-black text-[24px] mb-[15px]">Flash Sale</h3>
      <div className="mt-4 grid xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 border-t border-b">
        {loading
          ? "Please wait..."
          : flashSaleProdcuts?.map((product, index) => (
              <SingleProduct key={index} index={index} product={product} />
            ))}
      </div>
    </SectionWraper>
  );
};

export default FlashSale;

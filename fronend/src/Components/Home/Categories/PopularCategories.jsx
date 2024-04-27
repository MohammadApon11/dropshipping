import useGetAllCategories from "../../../Hooks/useGetAllCategories";
import SectionWraper from "../../Wrapper's/SectionWraper";
import Category from "./Category";

const PopularCategories = () => {
  const { categories, loading } = useGetAllCategories();

  return (
    <SectionWraper>
     
      <h3 className="text-black text-[24px] mb-[15px]">
        {" "}
        Explore Popular Categories
      </h3>
      <div className="grid xl:grid-cols-7 lg:grid-cols-5 md:grid-cols-4 mobile:grid-cols-3 xxs:grid-cols-2 border">
        {loading
          ? "Please wait..."
          : categories.map((category, index) => (
              <Category
                key={index}
                category={category}
                index={index}
              ></Category>
            ))}
      </div>
    </SectionWraper>
  );
};

export default PopularCategories;

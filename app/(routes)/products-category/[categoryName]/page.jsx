import GlobalApi from "@/app/_utils/GlobalApi";
import React from "react";
import TopCategoryList from "../_components/TopCategoryList";
import ProductList from "@/app/_components/ProductList";

const ProductCategory = async ({ params }) => {
  const products = await GlobalApi.getProductByCategory(params.categoryName);
  const categoryList = await GlobalApi.getCategoryList();
  return (
    <div>
      <h2 className="text-white bg-primary font-bold text-3xl p-4 text-center">
        {params.categoryName}
      </h2>
      <TopCategoryList
        categoryList={categoryList}
        selectedCategory={params.categoryName}
      />
      <div className="p-5 md:p-10">
        <ProductList productList={products} />
      </div>
    </div>
  );
};

export default ProductCategory;

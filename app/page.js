import Image from "next/image";
import CategoryList from "./_components/CategoryList";
import ProductList from "./_components/ProductList";
import Slider from "./_components/Slider";
import GlobalApi from "./_utils/GlobalApi";
import Footer from "./_components/Footer";

export default async function Home() {
  const sliderList = await GlobalApi.getSliders();
  const categoryList = await GlobalApi.getCategoryList();
  const productList = await GlobalApi.getProducts();
  return (
    <>
      <div className="p-10 px-16">
        <Slider sliderList={sliderList} />
        <CategoryList categoryList={categoryList} />
        <ProductList productList={productList} />
        <Image
          src={"/banner.png"}
          width={2000}
          height={300}
          alt="banner"
          className="w-full height-[200px] object-content mt-[80px]"
        />
      </div>
    </>
  );
}

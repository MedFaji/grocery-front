import React from "react";
import Image from "next/image";
import Link from "next/link";

const TopCategoryList = ({ categoryList, selectedCategory }) => {
  return (
    <div className="flex mt-8 gap-5 overflow-auto mx-7 py-1 md:mx-20 justify-center">
      {categoryList.map((category, index) => (
        <Link
          href={`/products-category/${category.attributes?.name}`}
          key={index}
          className={
            "flex flex-col items-center justify-center bg-green-50 outline outline-1 outline-primary rounded-lg p-5 mt-5 gap-2 cursor-pointer group hover:bg-green-200 w-[160px] min-w-[100px] " +
            (selectedCategory === category.attributes.name && "bg-green-200")
          }
        >
          <Image
            src={
              process.env.NEXT_PUBLIC_API_URL +
              category.attributes?.icon?.data?.attributes?.url
            }
            width={50}
            height={50}
            alt="category"
            className="w-15 h-15 object-cover rounded-2xl hover:scale-110 transition-all duration-300 ease-in-out group-hover:scale-110"
          />
          <h2 className="text-lg text-green-800 font-semibold">
            {category.attributes.name}
          </h2>
        </Link>
      ))}
    </div>
  );
};

export default TopCategoryList;

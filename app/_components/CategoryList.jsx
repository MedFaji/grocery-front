import Image from "next/image";
import React from "react";
import Link from "next/link";

const CategoryList = ({ categoryList }) => {
  return (
    <div className="mt-16">
      <h2 className="text-green-600 font-bold text-2xl">Shop by Category</h2>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-7 gap-5">
        {categoryList.map((category, index) => (
          <Link
            href={`/products-category/${category.attributes?.name}`}
            key={index}
            className="flex flex-col items-center justify-center bg-green-50 shadow-md rounded-lg p-5 mt-5 gap-2 cursor-pointer group  hover:bg-green-100 "
          >
            <Image
              src={category.attributes?.icon?.data?.attributes?.url}
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
    </div>
  );
};

export default CategoryList;

"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ShoppingBasket } from "lucide-react";

const PorductItemDetails = ({ product }) => {
  const [total, setTotal] = useState(
    product.attributes?.sellingPrice || product.attributes?.mrp
  );
  const [quantity, setQuantity] = useState(1);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 items-start p-7 bg-white text-black gap-5">
      <Image
        src={
          process.env.NEXT_PUBLIC_API_URL +
          product.attributes?.images?.data[0]?.attributes?.url
        }
        width={300}
        height={200}
        alt={product.attributes.name}
        className="h-full p-3 object-contain rounded-2xl bg-slate-200"
      />
      <div className="flex flex-col gap-4 ">
        <h2 className="text-xl font-bold">{product.attributes?.name}</h2>
        <h2 className="text-gray-600 text-lg ">
          {product.attributes?.description}
        </h2>
        <div>
          {product.attributes?.sellingPrice ? (
            <div className="flex gap-3">
              <h2 className="text-lg   font-semibold">
                ${product.attributes.sellingPrice}
              </h2>
              <h2 className="text-lg  font-semibold  line-through text-gray-500">
                ${product.attributes.mrp}
              </h2>
            </div>
          ) : (
            <h2 className="text-lg   font-semibold">
              ${product.attributes.mrp}
            </h2>
          )}
        </div>
        <h2 className="font-meduim text-lg">
          Quantity ({product.attributes?.itemQuantityType})
        </h2>
        <div className="flex flex-col items-baseline gap-3">
          <div className="flex gap-10 items-center p-2 border px-5">
            <button
              onClick={() => {
                if (quantity > 1) {
                  setQuantity(quantity - 1);
                  setTotal(
                    total - product.attributes?.sellingPrice ||
                      product.attributes?.mrp
                  );
                }
              }}
              disabled={quantity === 1}
            >
              -
            </button>
            <h2>{quantity}</h2>
            <button
              onClick={() => {
                setQuantity(quantity + 1);
                setTotal(
                  total + product.attributes?.sellingPrice ||
                    product.attributes?.mrp
                );
              }}
            >
              +
            </button>
            <h2 className="font-semibold">
              Total:{" "}
              <span className="font-semibold text-primary">
                ${total.toFixed(2)}
              </span>
            </h2>
          </div>
          <Button
            variant="solid"
            className="text-white bg-primary hover:bg-primary flex items-center gap-3 "
          >
            <ShoppingBasket />
            Add To Cart
          </Button>
        </div>
        <h2>
          <span className="font-bold">Category: </span>{" "}
          {product.attributes?.categories?.data[0]?.attributes?.name}
        </h2>
      </div>
    </div>
  );
};

export default PorductItemDetails;

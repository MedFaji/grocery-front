import { Button } from "@/components/ui/button";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ProductItemDetails from "./ProductItemDetails";

const ProductItem = ({ product }) => {
  return (
    <div className="flex flex-col items-center justify-center border rounded-lg p-4 mt-5 gap-3 cursor-pointer group  hover:bg-green-100 ">
      <img
        src={
          process.env.NEXT_PUBLIC_API_URL +
          product.attributes?.images?.data[0]?.attributes?.url
        }
        width={500}
        height={200}
        alt={product.attributes.name}
        className="w-[200px] h-[200px] object-contain rounded-2xl hover:scale-110 transition-all duration-300 ease-in-out group-hover:scale-110"
      />

      <h2 className="text-lg font-semibold">{product.attributes.name}</h2>
      {product.attributes?.sellingPrice ? (
        <div className="flex gap-3">
          <h2 className="text-md  font-semibold">
            ${product.attributes.sellingPrice}
          </h2>
          <h2 className="text-md  font-semibold  line-through text-gray-500">
            ${product.attributes.mrp}
          </h2>
        </div>
      ) : (
        <h2 className="text-md  font-semibold">${product.attributes.mrp}</h2>
      )}

      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="text-primary hover:text-white hover:bg-primary"
          >
            Add to cart
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <ProductItemDetails product={product} />
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductItem;

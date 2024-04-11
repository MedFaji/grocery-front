import React, { useEffect, useState } from "react";
import Image from "next/image";
import { TrashIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

const CartItemList = ({ cartItemList, deleteItem }) => {
  return (
    <div>
      <div className="flex flex-col gap-4 h-[500px] overflow-auto">
        {cartItemList.map((cartItem, index) => (
          <div key={index} className="flex items-center gap-6 p-2  rounded-lg ">
            <Image
              src={cartItem.image}
              width={70}
              height={70}
              className="rouded-lg object-cover max-w-[70px] max-h-[70px] flex-1"
              alt={cartItem.name}
            />
            <div className="flex flex-col gap-1 flex-1">
              <h2>{cartItem.name}</h2>
              <div className="flex gap-2 items-center">
                <h2>Qty: {cartItem.quantity}</h2>
                <h2>Price: ${cartItem.amount}</h2>
              </div>
            </div>
            <TrashIcon
              height={6}
              width={6}
              className="w-6 h-6 cursor-pointer text-gray-500 hover:text-primary ml-auto mr-2 flex-1"
              onClick={() => deleteItem(cartItem.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CartItemList;

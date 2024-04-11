import React, { useEffect } from "react";
import Image from "next/image";

const MyOrderItem = ({ order }) => {
  return (
    <div className="grid grid-cols-5 w-[50%] p-4">
      <Image
        src={
          process.env.NEXT_PUBLIC_API_URL +
          order.product.data.attributes.images.data[0].attributes.url
        }
        alt="product"
        className="w-20 h-20 bg-gray-100 p-5 rounded-sm border"
        width={80}
        height={80}
      />

      <div className="col-span-2">
        <h2>{order.product.data.attributes.name}</h2>
        <h2>Item Price: ${order.product.data.attributes.mrp}</h2>
      </div>
      <h2>Quantity: {order.quantity}</h2>
      <h2>Price: ${order.amount}</h2>
      <hr className="mt-4 w-full" />
    </div>
  );
};

export default MyOrderItem;

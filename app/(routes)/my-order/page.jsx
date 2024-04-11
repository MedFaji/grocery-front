"use client";
import GlobalApi from "@/app/_utils/GlobalApi";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import moment from "moment";
import Image from "next/image";
import MyOrderItem from "./_components/MyOrderItem";

const MyOrder = () => {
  const jwt = getCookie("jwt");
  const user = JSON.parse(getCookie("user"));
  const router = useRouter();
  const [orderList, setOrderList] = useState([]);

  useEffect(() => {
    if (!jwt) {
      router.replace("/sign-in");
    }
    getOrders();
  }, []);

  const getOrders = async () => {
    const orderList_ = await GlobalApi.getMyOrders(user.id, jwt);
    setOrderList(orderList_);
  };

  return (
    <div>
      <h2 className="text-white bg-primary font-bold text-3xl p-4 text-center ">
        My Orders
      </h2>
      <div className="py-8 mx-7 md:mx-20">
        <h2 className="text-3xl font-bold text-primary pb-8">Order History</h2>
        <div>
          {orderList.map((order, index) => (
            <Collapsible key={index}>
              <CollapsibleTrigger>
                <div className=" border p-2 bg-slate-100 flex justify-between gap-20">
                  <h2>
                    <span className="font-bold mr-2">Order Date:</span>
                    {moment(order.createdAt).format("DD/MM/YYYY")}
                  </h2>
                  <h2>
                    <span className="font-bold mr-2">Total Amount:</span>
                    {order?.totalOrderAmount.toFixed(2)}
                  </h2>
                  <h2>
                    <span className="font-bold mr-2">Status:</span>
                    {order?.status}
                  </h2>
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent>
                {order.orderItemList.map((item, index) => (
                  <>
                    <MyOrderItem key={index} order={item} />
                  </>
                ))}
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyOrder;

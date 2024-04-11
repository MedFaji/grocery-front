"use client";
import { UpdateCartContext } from "@/app/_context/UpdateCartContext";
import GlobalApi from "@/app/_utils/GlobalApi";

import { useRouter } from "next/navigation";
import React, { use, useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import { LoaderIcon } from "lucide-react";

const Checkout = () => {
  const jwt = sessionStorage.getItem("jwt");
  const user = JSON.parse(sessionStorage.getItem("user"));
  const { updateCart, setUpdateCart } = useContext(UpdateCartContext);
  const [totalCartItems, setTotalCartItems] = useState(0);
  const [cartItemList, setCartItemList] = useState([]);
  const isLogged = sessionStorage.getItem("jwt") ? true : false;
  const [subTotal, setSubTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const onCheckout = async (e) => {
    e.preventDefault();

    const order = {
      data: {
        username: firstName + " " + lastName,
        zip: "123456",
        address: address,
        email: user.email,
        phone: phoneNumber,
        totalOrderAmount: subTotal.toFixed(2),
        userId: user.id,
        paymentId: "123456",
        orderItemList: cartItemList,
      },
    };
    setIsLoading(true);
    GlobalApi.createOrder(order, jwt)
      .then((response) => {
        if (response.data) {
          toast.success("Order placed successfully.");
          cartItemList.forEach((item) => {
            GlobalApi.deleteCartItem(item.id, jwt);
            setIsLoading(false);
          });

          setUpdateCart(!updateCart);
          router.replace("/order-confirmation");
        }
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error("Error placing order. Please try again");
      });
  };

  const getCartItems = async () => {
    const cartItemList_ = await GlobalApi.getCartItems(user.id, jwt);
    setTotalCartItems(cartItemList_.length);
    setCartItemList(cartItemList_);
  };

  useEffect(() => {
    if (isLogged) {
      getCartItems();
      setSubTotal(cartItemList.reduce((acc, item) => acc + item.amount, 0));
    }
  }, [isLogged, updateCart]);

  useEffect(() => {
    setSubTotal(cartItemList.reduce((acc, item) => acc + item.amount, 0));
  }, [cartItemList]);

  useEffect(() => {
    if (!isLogged) {
      router.push("/auth/sign-in");
    }
  }, []);

  return (
    <div className="overflow-y-hidden">
      <h2 className="text-white bg-primary font-bold text-3xl p-4 text-center">
        Checkout
      </h2>
      <div className="flex justify-center items-center 2xl:container 2xl:mx-auto lg:py-16 md:py-12 py-9 px-4 md:px-6 lg:px-20 xl:px-44 ">
        <div className="flex w-full sm:w-9/12 lg:w-full flex-col lg:flex-row justify-center items-center lg:space-x-10 2xl:space-x-36 space-y-12 lg:space-y-0">
          <form
            className="flex w-full  flex-col justify-start items-start"
            onSubmit={onCheckout}
          >
            <div className="mt-2"></div>
            <div className="mt-12">
              <p className="text-xl font-semibold leading-5 text-gray-800">
                Shipping Details
              </p>
            </div>
            <div className="mt-8 flex flex-col justify-start items-start w-full space-y-8 ">
              <div className="flex gap-6 w-full">
                <input
                  className="px-2 focus:outline-none focus:ring-2 focus:ring-primary border-b border-primary leading-4 text-base placeholder-gray-600 py-4 w-full"
                  type="text"
                  placeholder="First Name"
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
                <input
                  className="px-2 focus:outline-none focus:ring-2 focus:ring-primary border-b border-primary leading-4 text-base placeholder-gray-600 py-4 w-full"
                  type="text"
                  placeholder="Last Name"
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>

              <input
                className="px-2 focus:outline-none focus:ring-2 focus:ring-primary border-b border-primary leading-4 text-base placeholder-gray-600 py-4 w-full"
                type="text"
                placeholder="Address"
                onChange={(e) => setAddress(e.target.value)}
                required
              />
              <input
                className="focus:outline-none focus:ring-2 focus:ring-primary px-2 border-b border-primary leading-4 text-base placeholder-gray-600 py-4   w-full"
                type="text"
                placeholder="Phone Number"
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="flex justify-center items-center focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 mt-10 text-base font-medium focus:ring-ocus:ring-gray-800 leading-4 hover:bg-green-500 py-4 w-full md:w-4/12 lg:w-full text-white bg-primary rounded-lg "
            >
              {isLoading ? (
                <LoaderIcon className="animate-spin h-5 w-5" />
              ) : (
                "Proceed to payment"
              )}
            </button>
          </form>
          <div className="flex flex-col justify-start items-start bg-gray-50 w-full p-6 md:p-14">
            <div>
              <h1 className="text-2xl font-semibold leading-6 text-gray-800">
                Order Summary
              </h1>
            </div>
            <div className="flex mt-7 flex-col items-end w-full space-y-6">
              <div className="flex justify-between w-full items-center">
                <p className="text-lg leading-4 text-gray-600">Total items</p>
                <p className="text-lg font-semibold leading-4 text-gray-600">
                  {cartItemList.length}
                </p>
              </div>
              <div className="flex justify-between w-full items-center">
                <p className="text-lg leading-4 text-gray-600">
                  Shipping charges
                </p>
                <p className="text-lg font-semibold leading-4 text-gray-600">
                  FREE
                </p>
              </div>
              <div className="flex justify-between w-full items-center">
                <p className="text-lg leading-4 text-gray-600">Sub total </p>
                <p className="text-lg font-semibold leading-4 text-gray-600">
                  ${subTotal.toFixed(2)}
                </p>
              </div>
            </div>
            <div className="flex justify-between w-full items-center mt-24">
              <p className="text-xl font-semibold leading-4 text-gray-800">
                Estimated Total
              </p>
              <p className="text-lg font-semibold leading-4 text-gray-800">
                ${subTotal.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

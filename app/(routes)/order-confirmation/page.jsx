"use client";
import React, { useEffect } from "react";
import Link from "next/link";

const OrderConfirmation = () => {
  const isLogged =
    sessionStorage && sessionStorage.getItem("jwt") ? true : false;
  useEffect(() => {
    if (!isLogged) {
      window.location.href = "/sign-in";
    }
  }, []);
  return (
    <div class="flex justify-center items-center my-40">
      <div class="bg-white p-10 md:mx-auto rounded-md shadow-md border  border-gray-300">
        <svg viewBox="0 0 24 24" class="text-green-600 w-16 h-16 mx-auto my-6">
          <path
            fill="currentColor"
            d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
          ></path>
        </svg>
        <div class="text-center">
          <h3 class="md:text-2xl text-base text-gray-900 font-semibold text-center">
            Order Successfull!
          </h3>
          <p class="text-gray-600 my-3">
            Thank you for completing your secure online payment.
          </p>
          <p class="text-gray-600 my-3 ma">
            We are going to process your order and will give you a call shortly.
          </p>

          <p> Have a great day! </p>
          <div class="py-10 text-center">
            <Link
              href="/my-order"
              class="px-12 bg-primary hover:bg-green-600 rounded-sm text-white font-semibold py-3"
            >
              Track your Order
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;

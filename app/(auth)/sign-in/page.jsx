"use client";
import React, { use, useEffect, useState } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import GlobalApi from "@/app/_utils/GlobalApi";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { LoaderIcon } from "lucide-react";
import { getCookie, setCookie } from "cookies-next";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (getCookie("jwt")) {
      router.push("/");
    }
  }, []);

  const onSignIn = () => {
    setLoading(true);
    GlobalApi.SignIn(email, password)
      .then((response) => {
        if (response.data.user) {
          toast.success("Sign In Successfully");
          setCookie("user", JSON.stringify(response.data.user));
          setCookie("jwt", response.data.jwt);
          router.push("/");
          setLoading(false);
        } else {
          toast.error("Invalid Email or Password");
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error(
          error?.response?.data?.error?.message || "An error occured"
        );
        setLoading(false);
      });
  };

  return (
    <div className="flex justify-center items-center pt-12">
      <div className="flex flex-col gap-5 my-14 p-20 bg-gray-50 outline outline-gray-200">
        <Link href={"/"}>
          <div className="flex flex-col items-center justify-center">
            <Image src="/logo.png" alt="logo" width={80} height={40} />
            <div className="flex gap-1 text-4xl font-bold">
              <span className="text-green-800 ">Grocery</span>
              <span className="text-orange-600">Store</span>
            </div>
          </div>
        </Link>

        <div className="text-center mb-4">
          <h2 className="font-bold text-3xl">Sign In</h2>
          <h2 className="text-gray-500">
            Enter your Email and Password to Sign In
          </h2>
        </div>
        <div className="flex flex-col gap-5">
          <Input
            placeholder="name@example.com"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button onClick={onSignIn} disabled={!(email && password)}>
            {loading ? (
              <LoaderIcon className="animate-spin h-5 w-5" />
            ) : (
              "Sign In"
            )}
          </Button>
        </div>
        <p className="">
          Don't have an account ?{" "}
          <Link
            href={"/create-account"}
            className="text-primary cursor-pointer"
          >
            Click here to create a new account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;

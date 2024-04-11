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

const CreateAccount = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("jwt")) {
      router.push("/");
    }
  }, []);

  const createAccount = () => {
    setLoading(true);

    GlobalApi.registerUser(username, email, password)
      .then((res) => {
        sessionStorage.setItem("user", JSON.stringify(res.data.user));
        sessionStorage.setItem("jwt", res.data.jwt);
        toast.success("Account created successfully");
        router.push("/sign-in");
        setLoading(false);
      })
      .catch((err) => {
        toast.error(err?.response?.data?.error?.message || "An error occured");
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
          <h2 className="font-bold text-3xl">Create an account</h2>
          <h2 className="text-gray-500">
            Enter your Email and Password to Create an account
          </h2>
        </div>
        <div className="flex flex-col gap-5">
          <Input
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            placeholder="name@example.com"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            onClick={createAccount}
            disabled={!(username && email && password)}
          >
            {loading ? (
              <LoaderIcon className="animate-spin h-5 w-5" />
            ) : (
              "Create an Account"
            )}
          </Button>
        </div>
        <p className="">
          Already have an account ?{" "}
          <Link href={"/sign-in"} className="text-primary cursor-pointer">
            Click here to Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default CreateAccount;

"use client";
import { Button } from "@/components/ui/button";
import { LayoutGrid, Search, ShoppingBag } from "lucide-react";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import GlobalApi from "../_utils/GlobalApi";
import { useEffect, useState } from "react";
import Link from "next/link";

const Header = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategoryList();
  }, []);

  const getCategoryList = () => {
    GlobalApi.getCategories().then((response) => {
      setCategories(response.data.data);
    });
  };

  return (
    <div className="flex p-5 shadow-sm justify-between items-center">
      <div className="flex items-center gap-8 ">
        <div className="flex items-center gap-2">
          <Image src="/logo.png" alt="logo" width={50} height={20} />
          <div className="flex gap-1 text-[1.5rem] font-bold">
            <span className="text-green-800">Grocery</span>
            <span className="text-orange-600">Store</span>
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger>
            <h2 className="md:flex gap-2 items-center border rounded-full p-2 px-6 bg-slate-200 cursor-pointer hidden">
              <LayoutGrid className="h-5 w-5" /> Category
            </h2>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Browse Category</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {categories.map((category) => (
              <Link href={`/products-category/${category.attributes?.name}`}>
                <DropdownMenuItem
                  key={category?.id}
                  className="flex gap-3 items-center cursor-pointer"
                >
                  <Image
                    src={
                      process.env.NEXT_PUBLIC_API_URL +
                      category?.attributes?.icon?.data.attributes?.url
                    }
                    width={25}
                    height={25}
                    alt="category-icon"
                  />
                  <h2 className="text-lg">{category?.attributes?.name}</h2>
                </DropdownMenuItem>
              </Link>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="md:flex gap-3 items-center border rounded-full p-2 px-5 hidden">
          <Search className="h-5 w-5" />
          <input type="text" placeholder="Search" className="outline-none" />
        </div>
      </div>
      <div className="flex gap-8 items-center">
        <h2 className="flex items-center gap-1">
          <ShoppingBag /> 0
        </h2>
        <Button>Login</Button>
      </div>
    </div>
  );
};

export default Header;

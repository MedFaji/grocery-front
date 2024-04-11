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
import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { CircleUserRound } from "lucide-react";
import { useRouter } from "next/navigation";
import { UpdateCartContext } from "../_context/UpdateCartContext";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import CartItemList from "./CartItemList";
import { toast } from "sonner";
import { deleteCookie, getCookie } from "cookies-next";

const Header = () => {
  const [categories, setCategories] = useState([]);
  const isLogged = getCookie("jwt") ? true : false;

  const router = useRouter();
  const [totalCartItems, setTotalCartItems] = useState(0);
  const jwt = getCookie("jwt");
  const userCookie = getCookie("user");
  const user = userCookie ? JSON.parse(userCookie) : null;
  const { updateCart, setUpdateCart } = useContext(UpdateCartContext);
  const [cartItemList, setCartItemList] = useState([]);

  useEffect(() => {
    getCategoryList();
  }, []);

  useEffect(() => {
    if (isLogged) {
      getCartItems();
    }
  }, [isLogged, updateCart]);

  const getCategoryList = () => {
    GlobalApi.getCategories().then((response) => {
      setCategories(response.data.data);
    });
  };

  const signOut = () => {
    deleteCookie("jwt");
    deleteCookie("user");
    router.push("/sign-in");
  };

  const getCartItems = async () => {
    const cartItemList_ = await GlobalApi.getCartItems(user.id, jwt);
    setTotalCartItems(cartItemList_.length);
    setCartItemList(cartItemList_);
  };

  const deleteItem = async (id) => {
    await GlobalApi.deleteCartItem(id, jwt)
      .then((res) => {
        toast.success("Item removed from cart");
        setUpdateCart(!updateCart);
      })
      .catch((err) => {
        toast.error("Something went wrong");
      });
  };

  const [subTotal, setSubTotal] = useState(0);

  useEffect(() => {
    setSubTotal(cartItemList.reduce((acc, item) => acc + item.amount, 0));
  }, [cartItemList]);

  const checkout = () => {
    if (cartItemList.length === 0) {
      toast.error("Cart is empty");
      router.push("/");
    }

    if (!isLogged) {
      toast.error("Please login to checkout");
      router.push("/sign-in");
    }
    router.push("/checkout");
  };

  return (
    <div className="flex p-5 shadow-sm justify-between items-center">
      <div className="flex items-center gap-8 ">
        <Link href={"/"}>
          <div className="flex items-center gap-2">
            <Image src="/logo.png" alt="logo" width={50} height={20} />
            <div className="flex gap-1 text-[1.5rem] font-bold">
              <span className="text-green-800">Grocery</span>
              <span className="text-orange-600">Store</span>
            </div>
          </div>
        </Link>

        <DropdownMenu>
          <DropdownMenuTrigger>
            <h2 className="md:flex gap-2 items-center border rounded-full p-2 px-6 bg-slate-200 cursor-pointer hidden">
              <LayoutGrid className="h-5 w-5" /> Category
            </h2>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Browse Category</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {categories.map((category, index) => (
              <Link
                href={`/products-category/${category.attributes?.name}`}
                key={index}
              >
                <DropdownMenuItem
                  key={category?.id}
                  className="flex gap-3 items-center cursor-pointer"
                >
                  <Image
                    src={category?.attributes?.icon?.data.attributes?.url}
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
        <Sheet>
          <SheetTrigger>
            <h2 className="flex items-center gap-1">
              <ShoppingBag />{" "}
              <span className="bg-primary text-white p-1 px-2 rounded-full text-xs">
                {totalCartItems}
              </span>
            </h2>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle className="bg-primary text-white font-bold text-lg p-2 mt-4 text-center">
                My Cart
              </SheetTitle>
              <SheetDescription>
                <CartItemList
                  cartItemList={cartItemList}
                  deleteItem={deleteItem}
                />
              </SheetDescription>
            </SheetHeader>
            <SheetClose asChild>
              <div className="absolute bottom-6 w-[90%] flex flex-col">
                <h2 className="text-lg font-bold flex justify-between">
                  Subtotal <span>${subTotal.toFixed(2)}</span>
                </h2>
                <Button
                  className="bg-primary text-white p-2 rounded-lg mt-2"
                  onClick={checkout}
                  disabled={cartItemList.length === 0}
                >
                  Checkout
                </Button>{" "}
              </div>
            </SheetClose>
          </SheetContent>
        </Sheet>

        {isLogged ? (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <CircleUserRound className="h-7 w-7 text-primary " />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <Link href={"/my-order"}>
                <DropdownMenuItem>My orders</DropdownMenuItem>
              </Link>
              <DropdownMenuSeparator />

              <DropdownMenuItem onClick={signOut}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Link href="/sign-in">
            <Button>Sign In</Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;

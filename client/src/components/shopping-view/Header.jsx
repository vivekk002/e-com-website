import { House, LogOut, Menu, ShoppingCart, UserCog } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { shoppingViewHeaderMenuItems } from "@/config";
import { Avatar, AvatarFallback } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "../ui/dropdown-menu";
import { logOutUser } from "@/store/auth-slice";
import UserCartWrapper from "./cart-wrapper";
import { fetchCartItems } from "@/store/shop/cart-slice";
import { Label } from "../ui/label";

const MenuItems = () => {
  const navigate = useNavigate();

  const handleNavigate = (item) => {
    sessionStorage.removeItem("filters");
    const currentFilter =
      item.id !== "home" && item.id !== "search" && item.id !== "products"
        ? {
            category: [item.id],
          }
        : null;
    sessionStorage.setItem("filters", JSON.stringify(currentFilter));
    navigate(item.path);
  };

  return (
    <nav className="flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row mt-5">
      {shoppingViewHeaderMenuItems.map((menuItem) => (
        <Label
          key={menuItem.id}
          className="text-sm font-medium text-gray-900 hover:text-black-900 cursor-pointer "
          onClick={() => {
            handleNavigate(menuItem);
          }}
        >
          {menuItem.label}
        </Label>
      ))}
    </nav>
  );
};

const HeaderRightContent = () => {
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shoppingCart);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logOutUser());
  };
  useEffect(() => {
    if (user?.userId) {
      dispatch(fetchCartItems(user.userId));
    }
  }, [dispatch, user?.userId]);

  return (
    <div className="flex lg:items-center lg:flex-row flex-col gap-4 mt-3">
      <Sheet
        open={isCartOpen}
        onOpenChange={() => {
          setIsCartOpen(false);
        }}
      >
        <Button
          onClick={() => {
            setIsCartOpen(true);
          }}
          variant="outline"
          size="icon"
        >
          <ShoppingCart className="h-6 w-6" />
          <span className="sr-only">User Cart</span>
        </Button>
        <UserCartWrapper
          cartItems={
            cartItems && cartItems.items && cartItems.items.length > 0
              ? cartItems.items
              : []
          }
          setIsCartOpen={setIsCartOpen}
        />
      </Sheet>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className=" bg-black cursor-pointer">
            <AvatarFallback className="bg-black text-white font-extrabold">
              {user?.userName.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="right" className="w-56">
          <DropdownMenuLabel>Logged in as {user?.userName}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => navigate("/shop/account")}
            className="flex items-center cursor-pointer"
          >
            <UserCog className="m-2 h-4 w-4" />
            <span>Account</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={handleLogout}
            className="flex items-center cursor-pointer"
          >
            <LogOut className="m-2 h-4 w-4" />
            <span>Logout</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

const ShoppingHeader = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  return (
    <header className="sticky top-0 z-40 w-[100vw] border-b bg-background ">
      <div className="flex h-16 item-center justify-between px-4 md:px-6">
        <Link to="/shop/home" className="flex items-center gap-2 text-black">
          <House className="h-6 w-6" />
          <span className="font-bold">Shopping</span>
        </Link>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle header Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-full max-w-xs">
            <MenuItems />
            <div>
              <HeaderRightContent />
            </div>
          </SheetContent>
        </Sheet>
        <div className="hidden lg:block">
          <MenuItems />
        </div>

        <div className="hidden lg:block">
          <HeaderRightContent />
        </div>
      </div>
    </header>
  );
};

export default ShoppingHeader;

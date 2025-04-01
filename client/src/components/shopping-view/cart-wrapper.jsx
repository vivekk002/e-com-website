import React from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import UserCartItemsContent from "./cart-items-content";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

const UserCartWrapper = ({ cartItems }) => {
  const navigate = useNavigate();
  const totalCartAmount =
    cartItems && cartItems.length > 0
      ? cartItems.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.salePrice > 0
              ? currentItem?.salePrice
              : currentItem?.price) *
              currentItem?.quantity,
          0
        )
      : 0;
  return (
    <SheetContent className="sm:max-w-md">
      <SheetHeader>
        <SheetTitle>Your Cart</SheetTitle>
      </SheetHeader>
      <div className="mt-8 space-y-4">
        {cartItems && cartItems.length > 0 ? (
          cartItems.map((item) => (
            <UserCartItemsContent
              key={item._id || item.productId}
              cartItem={item}
            />
          ))
        ) : (
          <div
            key="empty-cart"
            className="flex justify-center items-center h-full"
          >
            <p className="text-gray-500">No items in cart</p>
          </div>
        )}
      </div>
      <div className="mt-8 space-y-4">
        <div key="total" className="flex justify-between">
          <span className="font-bold">Total</span>
          <span className="font-bold">${totalCartAmount.toFixed(2)}</span>
        </div>
      </div>
      <Button
        onClick={() => navigate("/shop/checkout")}
        className="w-full mt-4"
      >
        Checkout
      </Button>
    </SheetContent>
  );
};

export default UserCartWrapper;

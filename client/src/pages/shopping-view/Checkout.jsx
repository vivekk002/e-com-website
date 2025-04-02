import React from "react";
import { accountBackground } from "../../assets/constant";
import Address from "@/components/shopping-view/address";
import { useSelector } from "react-redux";
import UserCartItemsContent from "@/components/shopping-view/cart-items-content";

const ShoppingCheckout = () => {
  const { cartItems } = useSelector((state) => state.shoppingCart);

  return (
    <div className="flex flex-col gap-4">
      <div className="relative h-[300px] w-full overflow-hidden">
        <img
          src={accountBackground}
          alt="Checkout Background"
          className="h-full w-full object-cover object-center"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 mt-5 p-5 gap-3">
        <Address />
        <div className="flex flex-col gap-4">
          {cartItems?.items?.length > 0 ? (
            cartItems.items.map((item) => (
              <UserCartItemsContent
                key={item.productId?._id || item.productId}
                cartItem={item}
              />
            ))
          ) : (
            <div className="text-center text-gray-500">Your cart is empty</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShoppingCheckout;

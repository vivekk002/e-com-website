import React from "react";
import { Button } from "../ui/button";
import { Minus, Plus, Trash } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCartItem } from "@/store/shop/cart-slice";

const UserCartItemsContent = ({ cartItem }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleCartDelete = (getCartItem) => {
    dispatch(
      deleteCartItem({
        userId: user.userId,
        productId: getCartItem.productId,
      })
    );
  };

  return (
    <div className="flex items-center space-x-4">
      <img
        src={cartItem.image}
        alt={cartItem.name}
        className="w-20 h-20 rounded object-cover"
      />
      <div className="flex-1">
        <h3 className=" font-extrabold">{cartItem.title}</h3>
        <div className="flex items-center mt-1 gap-2">
          <Button
            variant="outline"
            size="icon"
            className="w-6 h-6 rounded-full"
          >
            <Minus className="w-4 h-4" />
            <span className="sr-only"> Decrease</span>
          </Button>
          <span className="text-sm font-semibold ml-2 mr-2">
            {cartItem.quantity}
          </span>
          <Button
            variant="outline"
            size="icon"
            className="w-6 h-6 rounded-full"
          >
            <Plus className="w-4 h-4" />
            <span className="sr-only"> Increase</span>
          </Button>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <p className="font-semibold">
          $
          {(
            (cartItem.salePrice > 0 ? cartItem.salePrice : cartItem.price) *
            cartItem.quantity
          ).toFixed(2)}
        </p>
        <Trash
          onClick={() => {
            handleCartDelete(cartItem);
          }}
          className="w-4 h-4 text-red-500 cursor-pointer"
        />
      </div>
    </div>
  );
};

export default UserCartItemsContent;

import React, { useState } from "react";
import { accountBackground } from "../../assets/constant";
import Address from "@/components/shopping-view/address";
import { useSelector } from "react-redux";
import UserCartItemsContent from "@/components/shopping-view/cart-items-content";
import { Button } from "@/components/ui/button";
import { createNewOrder } from "@/store/shop/order-slice";
import { useDispatch } from "react-redux";
import { useToast } from "@/hooks/use-toast";
const ShoppingCheckout = () => {
  const dispatch = useDispatch();
  const { toast } = useToast();

  const { cartItems } = useSelector((state) => state.shoppingCart);
  const { user } = useSelector((state) => state.auth);
  const { approvalURL } = useSelector((state) => state.shoppingOrder);

  const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);
  const [isPaymentStarted, setIsPaymentStarted] = useState(false);

  const totalCartAmount =
    cartItems?.items?.length > 0
      ? cartItems.items.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.salePrice > 0
              ? currentItem?.salePrice
              : currentItem?.price) *
              currentItem?.quantity,
          0
        )
      : 0;

  const handlePlaceOrder = () => {
    if (currentSelectedAddress === null) {
      toast({
        title: "Please select an address",
        description: "Please select an address to place your order",
        variant: "destructive",
      });
      return;
    }
    const orderData = {
      userId: user.userId,
      cartId: cartItems?._id,
      cartItems: cartItems.items.map((item) => ({
        productId: item?.productId,
        title: item?.title,
        image: item?.image,
        price: item?.salePrice > 0 ? item?.salePrice : item?.price,
        quantity: item?.quantity,
      })),
      address: {
        addressId: currentSelectedAddress?._id,
        address: currentSelectedAddress?.address,
        city: currentSelectedAddress?.city,
        state: currentSelectedAddress?.state,
        pincode: currentSelectedAddress?.pincode,
        phone: currentSelectedAddress?.phone,
        notes: currentSelectedAddress?.notes,
      },
      orderStatus: "pending",
      paymentMethod: "paypal",
      paymentStatus: "pending",
      totalPrice: totalCartAmount,
      orderDate: new Date(),
      orderUpdateDate: new Date(),
      paymentId: "",
      payerId: "",
    };
    dispatch(createNewOrder(orderData))
      .then((res) => {
        console.log("res", res);
        if (res.payload.success) {
          setIsPaymentStarted(true);
        } else {
          setIsPaymentStarted(false);
        }
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  if (approvalURL) {
    window.location.href = approvalURL;
  }

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
        <div>
          <div className="mb-2 flex items-center">
            <h2 className="text-xl font-semibold">Shipping Address</h2>
            {currentSelectedAddress && (
              <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                Address Selected
              </span>
            )}
          </div>
          <Address
            setCurrentSelectedAddress={setCurrentSelectedAddress}
            currentSelectedAddress={currentSelectedAddress}
          />
        </div>
        <div>
          <div className="flex flex-col gap-5 h-[60vh]">
            {cartItems?.items?.length > 0 ? (
              cartItems.items.map((item) => (
                <UserCartItemsContent
                  key={item.productId?._id || item.productId}
                  cartItem={item}
                />
              ))
            ) : (
              <div className="text-center text-gray-500">
                Your cart is empty
              </div>
            )}
          </div>
          <div>
            <div className="mt-8 space-y-4">
              <div key="total" className="flex justify-between">
                <span className="font-bold">Total</span>
                <span className="font-bold">${totalCartAmount.toFixed(2)}</span>
              </div>
            </div>
          </div>
          <div className="mt-4 w-full">
            <Button
              onClick={handlePlaceOrder}
              className="w-full"
              disabled={!currentSelectedAddress || !cartItems?.items?.length}
            >
              {!cartItems?.items?.length
                ? "Your Cart is Empty"
                : currentSelectedAddress
                ? "Place Order"
                : "Select an Address to Place Order"}
            </Button>
            {!currentSelectedAddress && cartItems?.items?.length > 0 && (
              <p className="text-sm text-red-500 mt-2 text-center">
                Please select a shipping address to continue
              </p>
            )}
            {!cartItems?.items?.length && (
              <p className="text-sm text-red-500 mt-2 text-center">
                Please add items to your cart to place an order
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCheckout;

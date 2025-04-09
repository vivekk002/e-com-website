import React, { useEffect, useState } from "react";
import { DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { useDispatch, useSelector } from "react-redux";
import { getOrderDetails } from "@/store/shop/order-slice";
import { Badge } from "../ui/badge";
import {
  Package,
  Truck,
  CreditCard,
  Calendar,
  MapPin,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "../ui/button";

const ShoppingOrderDetails = ({ orderId }) => {
  const dispatch = useDispatch();
  const { orderDetails, isLoading } = useSelector(
    (state) => state.shoppingOrder
  );
  const [currentProductIndex, setCurrentProductIndex] = useState(0);

  useEffect(() => {
    if (orderId) {
      dispatch(getOrderDetails(orderId));
    }
  }, [dispatch, orderId]);

  if (isLoading) {
    return (
      <DialogContent className="sm:max-w-[600px] max-h-[90vh]">
        <div className="flex items-center justify-center h-40">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      </DialogContent>
    );
  }

  if (!orderDetails) {
    return (
      <DialogContent className="sm:max-w-[600px] max-h-[90vh]">
        <div className="text-center text-gray-500">No order details found</div>
      </DialogContent>
    );
  }

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handlePrevProduct = () => {
    setCurrentProductIndex((prev) =>
      prev === 0 ? orderDetails.cartItems.length - 1 : prev - 1
    );
  };

  const handleNextProduct = () => {
    setCurrentProductIndex((prev) =>
      prev === orderDetails.cartItems.length - 1 ? 0 : prev + 1
    );
  };

  const currentProduct = orderDetails.cartItems[currentProductIndex];

  return (
    <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-hidden flex flex-col">
      <DialogHeader className="flex-shrink-0">
        <DialogTitle className="text-xl font-bold">Order Details</DialogTitle>
      </DialogHeader>
      <div className="overflow-y-auto flex-grow pr-2 custom-scrollbar">
        <div className="grid gap-6 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Calendar className="h-4 w-4" />
                <span>Order Date</span>
              </div>
              <p className="font-medium">
                {new Date(orderDetails.orderDate).toLocaleDateString()}
              </p>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Package className="h-4 w-4" />
                <span>Order ID</span>
              </div>
              <p className="font-medium">#{orderDetails._id.slice(-6)}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Truck className="h-4 w-4" />
                <span>Order Status</span>
              </div>
              <Badge
                variant="outline"
                className={`${getStatusColor(
                  orderDetails.orderStatus
                )} border-0 capitalize`}
              >
                {orderDetails.orderStatus}
              </Badge>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <CreditCard className="h-4 w-4" />
                <span>Payment Status</span>
              </div>
              <Badge
                variant="outline"
                className={`${getStatusColor(
                  orderDetails.paymentStatus
                )} border-0 capitalize`}
              >
                {orderDetails.paymentStatus}
              </Badge>
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <CreditCard className="h-4 w-4" />
              <span>Total Amount</span>
            </div>
            <p className="text-2xl font-bold">${orderDetails.totalPrice}</p>
          </div>

          <Separator />

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-lg">Order Items</h3>
              <div className="text-sm text-gray-500">
                {currentProductIndex + 1} of {orderDetails.cartItems.length}
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex flex-col md:flex-row gap-4">
                {currentProduct.image && (
                  <div className="w-full md:w-1/3">
                    <img
                      src={currentProduct.image}
                      alt={currentProduct.title}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  </div>
                )}
                <div className="flex-1 space-y-3">
                  <h4 className="font-medium text-lg">
                    {currentProduct.title}
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <p className="text-sm text-gray-500">Price</p>
                      <p className="font-medium">${currentProduct.price}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Quantity</p>
                      <p className="font-medium">{currentProduct.quantity}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Total</p>
                      <p className="font-medium">
                        ${currentProduct.price * currentProduct.quantity}
                      </p>
                    </div>
                  </div>
                  {currentProduct.description && (
                    <div>
                      <p className="text-sm text-gray-500">Description</p>
                      <p className="text-sm">{currentProduct.description}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-center items-center gap-4 mt-6">
              <Button
                variant="outline"
                size="icon"
                onClick={handlePrevProduct}
                className="h-10 w-10 rounded-full border-2 hover:bg-gray-100 transition-all duration-200"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={handleNextProduct}
                className="h-10 w-10 rounded-full border-2 hover:bg-gray-100 transition-all duration-200"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-gray-500" />
              <h3 className="font-semibold text-lg">Shipping Information</h3>
            </div>
            <div className="grid gap-2 p-4 bg-gray-50 rounded-lg">
              <p className="font-medium">{orderDetails.address?.address}</p>
              <p>
                {orderDetails.address?.city}, {orderDetails.address?.state}{" "}
                {orderDetails.address?.pincode}
              </p>
              <p>Phone: {orderDetails.address?.phone}</p>
              {orderDetails.address?.notes && (
                <p className="text-sm text-gray-500">
                  Notes: {orderDetails.address?.notes}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #c1c1c1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #a8a8a8;
        }
      `}</style>
    </DialogContent>
  );
};

export default ShoppingOrderDetails;

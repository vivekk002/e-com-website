import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import CommonForm from "../common/form";
import {
  updateOrderStatus,
  clearCurrentOrder,
  deleteOrder,
  getOrderById,
} from "../../store/admin/order-slice";
import { Button } from "../ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const AdminOrderDetails = ({ orderId }) => {
  const dispatch = useDispatch();
  const { currentOrder, isLoading } = useSelector((state) => state.adminOrders);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [orderStatus, setOrderStatus] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    // Set initial order status when current order changes
    if (currentOrder) {
      setOrderStatus(currentOrder.orderStatus);
    }
  }, [currentOrder]);

  useEffect(() => {
    // Clean up when component unmounts
    return () => {
      dispatch(clearCurrentOrder());
    };
  }, [dispatch]);

  const handleStatusChange = (value) => {
    setOrderStatus(value);
  };

  const handleUpdateStatus = async () => {
    setIsUpdating(true);
    try {
      await dispatch(updateOrderStatus({ id: orderId, orderStatus })).unwrap();
      // Refresh the order details after updating
      await dispatch(getOrderById(orderId)).unwrap();
    } catch (error) {
      console.error("Failed to update order status:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDeleteOrder = () => {
    dispatch(deleteOrder(orderId));
    setIsDeleteDialogOpen(false);
  };

  // Format date function
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (isLoading || !currentOrder) {
    return (
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <div className="flex justify-center items-center h-40">
          <p>Loading order details...</p>
        </div>
      </DialogContent>
    );
  }

  // Check if address exists
  const hasAddress =
    currentOrder.address && typeof currentOrder.address === "object";

  return (
    <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle>Order Details</DialogTitle>
      </DialogHeader>
      <div className="grid gap-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <p className="font-medium">Order ID</p>
            <Label>{currentOrder._id}</Label>
          </div>
          <div className="grid gap-2">
            <p className="font-medium">Order Date</p>
            <Label>{formatDate(currentOrder.orderDate)}</Label>
          </div>
          <div className="grid gap-2">
            <p className="font-medium">Order Status</p>
            <div className="flex items-center gap-2">
              <Select value={orderStatus} onValueChange={handleStatusChange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Processing">Processing</SelectItem>
                  <SelectItem value="Shipped">Shipped</SelectItem>
                  <SelectItem value="Delivered">Delivered</SelectItem>
                  <SelectItem value="Cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
              <Button
                size="sm"
                onClick={handleUpdateStatus}
                disabled={
                  isUpdating || orderStatus === currentOrder.orderStatus
                }
              >
                {isUpdating ? "Updating..." : "Update"}
              </Button>
            </div>
          </div>
          <div className="grid gap-2">
            <p className="font-medium">Order Price</p>
            <Label>${currentOrder.totalPrice}</Label>
          </div>
          <div className="grid gap-2">
            <p className="font-medium">Payment Method</p>
            <Label>{currentOrder.paymentMethod}</Label>
          </div>
          <div className="grid gap-2">
            <p className="font-medium">Payment Status</p>
            <Label>{currentOrder.paymentStatus}</Label>
          </div>
        </div>
      </div>
      <Separator className="my-4" />
      <div className="grid gap-4">
        <div className="grid gap-2">
          <div className="font-medium text-lg">Order Items</div>
          <div className="border rounded-md overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="py-2 px-4 text-left">Product</th>
                  <th className="py-2 px-4 text-left">Price</th>
                  <th className="py-2 px-4 text-left">Quantity</th>
                  <th className="py-2 px-4 text-left">Total</th>
                </tr>
              </thead>
              <tbody>
                {currentOrder.cartItems && currentOrder.cartItems.length > 0 ? (
                  currentOrder.cartItems.map((item, index) => (
                    <tr key={index} className="border-b">
                      <td className="py-2 px-4">{item.title}</td>
                      <td className="py-2 px-4">${item.price}</td>
                      <td className="py-2 px-4">{item.quantity}</td>
                      <td className="py-2 px-4">
                        $
                        {(
                          parseFloat(item.price) * parseInt(item.quantity)
                        ).toFixed(2)}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="py-4 text-center">
                      No items found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="text-lg font-medium">Shipping Information</div>
            {hasAddress ? (
              <div className="grid grid-cols-2 gap-2">
                <div className="col-span-2">
                  <p className="font-medium">Address</p>
                  <p>{currentOrder.address.address || "N/A"}</p>
                </div>
                <div>
                  <p className="font-medium">City</p>
                  <p>{currentOrder.address.city || "N/A"}</p>
                </div>
                <div>
                  <p className="font-medium">State</p>
                  <p>{currentOrder.address.state || "N/A"}</p>
                </div>
                <div>
                  <p className="font-medium">PIN</p>
                  <p>{currentOrder.address.pincode || "N/A"}</p>
                </div>
                <div>
                  <p className="font-medium">Phone</p>
                  <p>{currentOrder.address.phone || "N/A"}</p>
                </div>
                <div className="col-span-2">
                  <p className="font-medium">Note</p>
                  <p>{currentOrder.address.notes || "N/A"}</p>
                </div>
              </div>
            ) : (
              <p>No shipping information available</p>
            )}
          </div>
        </div>
      </div>
      <DialogFooter className="mt-4">
        <AlertDialog
          open={isDeleteDialogOpen}
          onOpenChange={setIsDeleteDialogOpen}
        >
          <AlertDialogTrigger asChild>
            <Button variant="destructive">Delete Order</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Are you sure you want to delete this order?
              </AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the
                order and remove it from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDeleteOrder}
                className="bg-red-600 hover:bg-red-700"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </DialogFooter>
    </DialogContent>
  );
};

export default AdminOrderDetails;

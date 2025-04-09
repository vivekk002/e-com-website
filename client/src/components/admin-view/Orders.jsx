import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Button } from "../ui/button";
import { Dialog } from "../ui/dialog";
import AdminOrderDetails from "./order-details";
import { fetchAllOrders, getOrderById } from "../../store/admin/order-slice";

const AdminOrders = () => {
  const dispatch = useDispatch();
  const { orderList, isLoading } = useSelector((state) => state.adminOrders);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  useEffect(() => {
    dispatch(fetchAllOrders());
  }, [dispatch]);

  const handleViewDetails = (orderId) => {
    setSelectedOrderId(orderId);
    dispatch(getOrderById(orderId));
    setOpenDetailsDialog(true);
  };

  // Format date function
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle> All Orders </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <p>Loading orders...</p>
          </div>
        ) : orderList.length === 0 ? (
          <div className="flex justify-center items-center h-40">
            <p>No orders found</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Order Date</TableHead>
                <TableHead>Order Amount</TableHead>
                <TableHead>Order Status</TableHead>
                <TableHead>
                  <span className="sr-only">Details</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orderList.map((order) => (
                <TableRow key={order._id}>
                  <TableCell>{order._id.substring(0, 8)}...</TableCell>
                  <TableCell>{formatDate(order.orderDate)}</TableCell>
                  <TableCell>${order.totalPrice}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        order.orderStatus === "Pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : order.orderStatus === "Processing"
                          ? "bg-blue-100 text-blue-800"
                          : order.orderStatus === "Shipped"
                          ? "bg-purple-100 text-purple-800"
                          : order.orderStatus === "Delivered"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {order.orderStatus}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Dialog
                      open={openDetailsDialog && selectedOrderId === order._id}
                      onOpenChange={(open) => {
                        setOpenDetailsDialog(open);
                        if (!open) setSelectedOrderId(null);
                      }}
                    >
                      <Button onClick={() => handleViewDetails(order._id)}>
                        View Details
                      </Button>
                      <AdminOrderDetails orderId={order._id} />
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};

export default AdminOrders;

import AdminOrders from "@/components/admin-view/Orders";
import React from "react";

const AdminOrdersPage = () => {
  return (
    <div className="container mx-auto grid grid-cols-1 gap-8 py-8">
      <AdminOrders />
    </div>
  );
};

export default AdminOrdersPage;

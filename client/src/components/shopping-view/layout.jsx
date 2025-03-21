import React from "react";
import { Outlet } from "react-router-dom";
import ShoppingHeader from "./Header";

const ShoppingLayout = () => {
  return (
    <div className="flex flex-col overflow-hidden bg-white ">
      {/* header */}
      <ShoppingHeader />

      <main className="flex flex-col w-full">
        <Outlet />
      </main>
    </div>
  );
};

export default ShoppingLayout;

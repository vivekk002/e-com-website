import React from "react";
import { Outlet, useLocation } from "react-router-dom";

function AuthLayout() {
  const location = useLocation();
  const isRegisterPage = location.pathname.includes("register");

  return (
    <div className="flex min-h-screen w-full">
      <div
        className={`hidden lg:flex w-1/2 items-center justify-center bg-black px-12 ${
          isRegisterPage ? "order-2" : "order-1"
        }`}
      >
        <div className="max-w-md space-y-6 text-center text-primary-foreground">
          <h1 className="text-4xl font-extrabold">
            Welcome to E-Com Shopping{" "}
          </h1>
        </div>
      </div>
      <div
        className={`flex-1 flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8 ${
          isRegisterPage ? "order-1" : "order-2"
        }`}
      >
        <Outlet />
      </div>
    </div>
  );
}

export default AuthLayout;

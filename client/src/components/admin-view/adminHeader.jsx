import { AlignJustify, LogOut } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import { logOutUser } from "@/store/auth-slice";
import { useDispatch } from "react-redux";
const AdminHeader = ({ setOpen }) => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logOutUser());
  };

  return (
    <header className="flex items-center justify-between px-4 py-3 bg-background border-b">
      <Button
        onClick={() => setOpen(true)}
        className="lg:hidden sm:block text-white"
      >
        <AlignJustify />
        <span className="sr-only "> Toggle Menu</span>
      </Button>
      <div className="flex flex-1  justify-end text-white">
        <button
          onClick={handleLogout}
          className="inline-flex gap-2 items-center rounded-md px-4 py-2 text-sm font-medium shadow"
        >
          <LogOut />
          Logout
        </button>
      </div>
    </header>
  );
};

export default AdminHeader;

import { BaggageClaim, ChartNoAxesCombined, LayoutDashboard, ShoppingBasket } from "lucide-react";
import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";

import {Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";

const adminSidebarMenuItems = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: <LayoutDashboard />,
    path: '/admin/dashboard',
  },
  {
    id: 'products',
    label: 'Products',
    icon: <ShoppingBasket />,
    path: '/admin/products',
  },
  {
    id: 'orders',
    label: 'Orders',
    icon: <BaggageClaim />,
    path: '/admin/orders',
  },
]


function MenuItems({setOpen}){
  const navigate = useNavigate();
  return <nav className="flex flex-col mt-8 gap-2">
    {
    adminSidebarMenuItems.map(menuItems =><div key={menuItems.id} onClick={() => {navigate(menuItems.path)
      setOpen? setOpen(false):null
    }
    }
       className="flex items-center gap-2 rounded-md px-4 py-2 hover:bg-gray-100 cursor-pointer">
{menuItems.icon}
<span>
{menuItems.label}
</span>
    </div> )
}
  </nav>
  
}

const AdminSidebar = ({ open, setOpen }) => {
  const navigate = useNavigate();
  
  return (
    <Fragment>
      <Sheet open={open} onOpenChange={setOpen}  >
          <SheetContent side="left" className="w-64"  >
            <div className="flex flex-col h-full">
              <SheetHeader className="border-b">
                <SheetTitle className="flex items-center gap-2">
                  <ChartNoAxesCombined size={30}/>
                  <span>Admin Panel</span>
                </SheetTitle>
              </SheetHeader>
              <MenuItems setOpen={setOpen}/>
            </div>
          </SheetContent>        
        </Sheet>
      <aside className="hidden w-64 flex-col border-r bg-background p-6 lg:flex">
        <div
          onClick={() => navigate("/admin/dashboard")}
          className="flex cursor-pointer items-center gap-2 hover:bg-gray-100 rounded-md px-4 py-2"
        >
          <ChartNoAxesCombined size={30}/>
          <h1 className="text-xl font-extrabold">Admin Panel</h1>
        </div>
        <MenuItems />
      </aside>
    </Fragment>
  );
};

export default AdminSidebar;

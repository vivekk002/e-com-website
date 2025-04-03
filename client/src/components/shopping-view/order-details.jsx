import React from "react";
import { DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";

const ShoppingOrderDetails = () => {
  return (
    <DialogContent className="sm:max-w-[600px]">
      <div className="grid gap-4">
        <div className="grid gap-2">
          <p className="font-medium">Order ID</p>
          <Label>1234567890</Label>
        </div>
        <div className="grid gap-2">
          <p className="font-medium">Order Date</p>
          <Label>20/10/2025</Label>
        </div>
        <div className="grid gap-2">
          <p className="font-medium">Order Status</p>
          <Label>Pending</Label>
        </div>
        <div className="grid gap-2">
          <p className="font-medium">Order Price</p>
          <Label>$ 100</Label>
        </div>
      </div>
      <Separator />
      <div className="grid gap-4">
        <div className="grid gap-2">
          <div className="font-medium text-lg">Order Details</div>
          <ul className="grid gap-2">
            <li className="flex items-center justify-between">
              <span>product one</span>
              <span> $100</span>
            </li>
          </ul>
        </div>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="text-lg font-medium">Shipping Info</div>
            <span>Name</span>
            <span>Address</span>
            <span>City</span>
            <span>State</span>
            <span>pin</span>
            <span>Phone</span>
            <span>Note</span>
          </div>
        </div>
      </div>
    </DialogContent>
  );
};

export default ShoppingOrderDetails;

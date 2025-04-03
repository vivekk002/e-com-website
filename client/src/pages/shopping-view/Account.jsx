import React from "react";
import { accountBackground } from "../../assets/constant";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ShoppingOrders from "@/components/shopping-view/orders";
import Address from "@/components/shopping-view/address";
const ShoppingAccount = () => {
  return (
    <div className="flex flex-col">
      <div className="relative h-[300px] w-full overflow-hidden">
        <img
          src={accountBackground}
          alt="account-background "
          className=" h-full w-full object-cover object-center "
        />
      </div>
      <div className="container mx-auto grid grid-cols-1 gap-8 py-8 ">
        <div className="flex flex-col rounded-lg border bg-background shadow-sm p-6">
          <Tabs>
            <TabsList>
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="address">Address</TabsTrigger>
            </TabsList>
            <TabsContent value="orders">
              <div className="flex flex-col gap-4">
                <h1 className="text-2xl font-bold">
                  <ShoppingOrders />
                </h1>
              </div>
            </TabsContent>
            <TabsContent value="address">
              <div className="flex flex-col gap-4">
                <h1 className="text-2xl font-bold">
                  <Address />
                </h1>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ShoppingAccount;

import React, { useState } from "react";
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
import { Dialog, DialogContent } from "../ui/dialog";
import ShoppingOrderDetails from "./order-details";
const ShoppingOrders = () => {
  const [openDeatailsDialog, setOpenDeatailsDialog] = useState(false);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Order History</CardTitle>
      </CardHeader>
      <CardContent>
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
            <TableRow>
              <TableCell>1</TableCell>
              <TableCell>2024-01-01</TableCell>
              <TableCell>$ 100</TableCell>
              <TableCell>Pending</TableCell>
              <TableCell>
                <Dialog
                  open={openDeatailsDialog}
                  onOpenChange={setOpenDeatailsDialog}
                >
                  <Button onClick={() => setOpenDeatailsDialog(true)}>
                    View Details
                  </Button>
                  <ShoppingOrderDetails />
                </Dialog>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default ShoppingOrders;

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

const PaymentSuccessPage = () => {
  return (
    <div className="container mx-auto py-10 flex justify-center items-center min-h-[70vh]">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="h-20 w-20 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle className="h-12 w-12 text-green-500" />
            </div>
          </div>
          <CardTitle className="text-2xl">Payment Successful</CardTitle>
          <CardDescription className="text-lg mt-2">
            Thank you for your purchase!
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <p className="mb-4 text-gray-600">
            Your order has been confirmed and will be processed shortly.
          </p>
          <p className="text-sm text-gray-500">
            You will receive an email confirmation with your order details.
          </p>
        </CardContent>
        <CardFooter className="flex flex-col gap-3">
          <Button asChild className="w-full">
            <Link to="/shop/home">
              <ShoppingBag className="mr-2 h-4 w-4" />
              Continue Shopping
            </Link>
          </Button>
          <Button variant="outline" asChild className="w-full">
            <Link to="/shop/account">View Order History</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PaymentSuccessPage;

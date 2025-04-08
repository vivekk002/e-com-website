import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { capturePayment } from "@/store/shop/order-slice";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

const PaymentReturnPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(true);
  const [error, setError] = useState(null);

  const params = new URLSearchParams(location.search);
  const paymentId = params.get("paymentId");
  const payerId = params.get("PayerID");

  useEffect(() => {
    if (paymentId && payerId) {
      const orderId = JSON.parse(sessionStorage.getItem("currentOrderId"));

      if (!orderId) {
        setError("Order information not found. Please try again.");
        setIsProcessing(false);
        return;
      }

      dispatch(capturePayment({ paymentId, payerId, orderId }))
        .then((data) => {
          if (data.payload.success) {
            sessionStorage.removeItem("currentOrderId");
            toast({
              title: "Payment Successful",
              description: "Your payment has been processed successfully.",
              variant: "success",
            });
            navigate("/shop/payment-success");
          } else {
            setError(
              data.payload.message ||
                "Payment processing failed. Please try again."
            );
            setIsProcessing(false);
          }
        })
        .catch((err) => {
          console.error("Payment capture error:", err);
          setError(
            "An error occurred while processing your payment. Please contact support."
          );
          setIsProcessing(false);
        });
    } else {
      setError("Payment information is missing. Please try again.");
      setIsProcessing(false);
    }
  }, [dispatch, paymentId, payerId, navigate, toast]);

  return (
    <div className="container mx-auto py-10 flex justify-center items-center min-h-[70vh]">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            {isProcessing ? (
              <div className="relative">
                <Loader2 className="h-16 w-16 text-primary animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-8 w-8 rounded-full bg-white"></div>
                </div>
              </div>
            ) : (
              <div className="h-16 w-16 rounded-full bg-red-100 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-red-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
            )}
          </div>
          <CardTitle className="text-2xl">
            {isProcessing ? "Processing Payment" : "Payment Status"}
          </CardTitle>
          <CardDescription className="text-lg mt-2">
            {isProcessing
              ? "Please wait while we process your payment. This may take a moment."
              : error
              ? error
              : "Your payment has been processed."}
          </CardDescription>
        </CardHeader>
        {error && (
          <div className="p-4 text-center">
            <button
              onClick={() => navigate("/shop/checkout")}
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
            >
              Return to Checkout
            </button>
          </div>
        )}
      </Card>
    </div>
  );
};

export default PaymentReturnPage;

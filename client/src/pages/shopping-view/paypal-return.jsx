// import React, { useEffect, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { updateOrderStatus } from "@/store/shop/order-slice";
// import { Button } from "@/components/ui/button";
// import { Loader2 } from "lucide-react";

const PaypalReturnPage = () => {
  //   const location = useLocation();
  //   const navigate = useNavigate();
  //   const dispatch = useDispatch();
  //   const [status, setStatus] = useState("processing"); // processing, success, error
  //   const [errorMessage, setErrorMessage] = useState("");
  //   const { user } = useSelector((state) => state.auth);
  //   useEffect(() => {
  //     const queryParams = new URLSearchParams(location.search);
  //     const paymentId = queryParams.get("paymentId");
  //     const payerId = queryParams.get("PayerID");
  //     const token = queryParams.get("token");
  //     if (!paymentId || !payerId || !token) {
  //       setStatus("error");
  //       setErrorMessage("Invalid payment return parameters");
  //       return;
  //     }
  //     // Update order status with payment details
  //     dispatch(
  //       updateOrderStatus({
  //         userId: user.userId,
  //         paymentId,
  //         payerId,
  //         token,
  //         paymentStatus: "completed",
  //         orderStatus: "confirmed",
  //       })
  //     )
  //       .then((response) => {
  //         if (response.payload?.success) {
  //           setStatus("success");
  //         } else {
  //           setStatus("error");
  //           setErrorMessage("Failed to update order status");
  //         }
  //       })
  //       .catch((error) => {
  //         setStatus("error");
  //         setErrorMessage(error.message || "An error occurred");
  //       });
  //   }, [location, dispatch, user]);
  //   const handleContinueShopping = () => {
  //     navigate("/shop");
  //   };
  //   const handleViewOrders = () => {
  //     navigate("/account/orders");
  //   };
  //   if (status === "processing") {
  //     return (
  //       <div className="min-h-screen flex items-center justify-center">
  //         <div className="text-center">
  //           <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
  //           <h2 className="text-xl font-semibold mb-2">Processing Payment</h2>
  //           <p className="text-gray-600">
  //             Please wait while we confirm your payment...
  //           </p>
  //         </div>
  //       </div>
  //     );
  //   }
  //   return (
  //     <div className="min-h-screen flex items-center justify-center bg-gray-50">
  //       <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-lg">
  //         {status === "success" ? (
  //           <>
  //             <div className="text-center mb-8">
  //               <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
  //                 <svg
  //                   className="w-8 h-8 text-green-500"
  //                   fill="none"
  //                   stroke="currentColor"
  //                   viewBox="0 0 24 24"
  //                 >
  //                   <path
  //                     strokeLinecap="round"
  //                     strokeLinejoin="round"
  //                     strokeWidth="2"
  //                     d="M5 13l4 4L19 7"
  //                   />
  //                 </svg>
  //               </div>
  //               <h2 className="text-2xl font-bold text-gray-900 mb-2">
  //                 Payment Successful!
  //               </h2>
  //               <p className="text-gray-600">
  //                 Thank you for your purchase. Your order has been confirmed.
  //               </p>
  //             </div>
  //             <div className="space-y-4">
  //               <Button
  //                 onClick={handleViewOrders}
  //                 className="w-full"
  //                 variant="default"
  //               >
  //                 View Orders
  //               </Button>
  //               <Button
  //                 onClick={handleContinueShopping}
  //                 className="w-full"
  //                 variant="outline"
  //               >
  //                 Continue Shopping
  //               </Button>
  //             </div>
  //           </>
  //         ) : (
  //           <>
  //             <div className="text-center mb-8">
  //               <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
  //                 <svg
  //                   className="w-8 h-8 text-red-500"
  //                   fill="none"
  //                   stroke="currentColor"
  //                   viewBox="0 0 24 24"
  //                 >
  //                   <path
  //                     strokeLinecap="round"
  //                     strokeLinejoin="round"
  //                     strokeWidth="2"
  //                     d="M6 18L18 6M6 6l12 12"
  //                   />
  //                 </svg>
  //               </div>
  //               <h2 className="text-2xl font-bold text-gray-900 mb-2">
  //                 Payment Failed
  //               </h2>
  //               <p className="text-gray-600">{errorMessage}</p>
  //             </div>
  //             <div className="space-y-4">
  //               <Button
  //                 onClick={() => navigate("/checkout")}
  //                 className="w-full"
  //                 variant="default"
  //               >
  //                 Try Again
  //               </Button>
  //               <Button
  //                 onClick={handleContinueShopping}
  //                 className="w-full"
  //                 variant="outline"
  //               >
  //                 Continue Shopping
  //               </Button>
  //             </div>
  //           </>
  //         )}
  //       </div>
  //     </div>
  //   );
};

export default PaypalReturnPage;

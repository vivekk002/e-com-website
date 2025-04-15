import React, { useEffect, useState } from "react";
import { Dialog, DialogContent } from "../ui/dialog";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { StarIcon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { useToast } from "@/hooks/use-toast";
import { setProductDetails } from "@/store/shop/product-slice";
import { useNavigate, useLocation } from "react-router-dom";
import ProductReview from "./product-review";

// Helper function to format date
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });
};

const ProductDetailDialog = ({ open, setOpen, productDetails }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (location.pathname) {
      setOpen(false);
      dispatch(setProductDetails());
    }
  }, [location.pathname, dispatch, setOpen]);

  useEffect(() => {
    return () => {
      setOpen(false);
      dispatch(setProductDetails());
    };
  }, [dispatch, setOpen]);

  const handleAddToCart = (getCurrentProductId) => {
    dispatch(
      addToCart({
        userId: user?.userId,
        productId: getCurrentProductId,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.userId));
        toast({
          title: "Product added to cart",
          description: "You can view your cart in the cart page",
          variant: "success",
        });
      }
    });
  };

  const handleBuyNow = (productId) => {
    if (!user) {
      window.location.href = "/auth/login";
      return;
    }

    setOpen(false);

    dispatch(
      addToCart({
        userId: user?.userId,
        productId: productId,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.userId));
        navigate("/shop/checkout");
      } else {
        toast({
          title: "Error",
          description: "Failed to add product to cart",
          variant: "destructive",
        });
      }
    });
  };

  const handleDialogClose = () => {
    setOpen(false);
    dispatch(setProductDetails());
  };

  if (!productDetails) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <div className="text-center p-6">Loading...</div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen} onClose={handleDialogClose}>
      <DialogContent className="grid grid-cols-2 gap-8 sm:p-12 max-w-[90vw] sm:max-w-[80vw] lg:max-w-[70vw] max-h-[90vh] overflow-auto">
        <div className="relative overflow-hidden rounded-lg">
          <img
            src={productDetails.image}
            alt={productDetails.title}
            width={600}
            height={600}
            className="w-full aspect-square object-cover"
          />
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold">{productDetails.title}</h1>
            <p className="text-xl text-muted-foreground">
              {productDetails.description}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <p
              className={`text-xl font-bold text-primary ${
                productDetails.salePrice > 0 ? "line-through" : ""
              }`}
            >
              ${productDetails.price}
            </p>
            {productDetails.salePrice > 0 && (
              <p className="text-xl text-green-600 font-bold text-primary">
                ${productDetails.salePrice}
              </p>
            )}
          </div>
          <div className="flex items-center gap-2 mt-2">
            <div className="flex items-center gap-0.2">
              {[...Array(5)].map((_, index) => (
                <StarIcon
                  key={index}
                  className={`w-5 h-5 ${
                    index < (productDetails.averageRating || 0)
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              {(productDetails.averageRating || 0).toFixed(1)}
              <span className="text-sm text-muted-foreground ml-1">
                ({productDetails.reviewsCount || 0})
              </span>
            </span>
          </div>
          <div className="flex items-center gap-3 mb-3 mt-5">
            <Button
              className="w-full"
              onClick={() => handleAddToCart(productDetails._id)}
            >
              Add to Cart
            </Button>
            <Button
              className="w-full"
              onClick={() => handleBuyNow(productDetails._id)}
            >
              Buy Now
            </Button>
          </div>
          <Separator />
          <ProductReview
            productId={productDetails._id}
            productTitle={productDetails.title}
            onReviewAdded={() => {
              // Refresh product details to update average rating
              // This will be handled by the ProductReview component itself
            }}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetailDialog;

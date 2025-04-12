import React, { useEffect, useState } from "react";
import { Dialog, DialogContent } from "../ui/dialog";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { StarIcon } from "lucide-react";
import { Input } from "../ui/input";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { useToast } from "@/hooks/use-toast";
import { setProductDetails } from "@/store/shop/product-slice";
import { useNavigate, useLocation } from "react-router-dom";
import {
  fetchProductReviews,
  addReview,
  updateReview,
  deleteReview,
} from "@/store/shop/review-slice";

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
  const { reviews, isLoading: reviewsLoading } = useSelector(
    (state) => state.reviews
  );
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(5);

  useEffect(() => {
    if (productDetails?._id) {
      dispatch(fetchProductReviews(productDetails._id));
    }
  }, [dispatch, productDetails?._id]);

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

  const handleAddReview = () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to add a review",
        variant: "destructive",
      });
      return;
    }

    if (!user.userId) {
      toast({
        title: "Session Expired",
        description: "Your session has expired. Please log in again.",
        variant: "destructive",
      });
      return;
    }

    if (!reviewText.trim()) {
      toast({
        title: "Review Text Required",
        description: "Please enter your review text",
        variant: "destructive",
      });
      return;
    }

    console.log("Adding review with user:", user);
    console.log("Product ID:", productDetails._id);
    console.log("Review data:", { rating, comment: reviewText.trim() });

    dispatch(
      addReview({
        productId: productDetails._id,
        reviewData: {
          rating,
          comment: reviewText.trim(),
        },
      })
    ).then((result) => {
      console.log("Review result:", result);
      if (result.type === "reviews/addReview/fulfilled") {
        setReviewText("");
        setRating(5);
        toast({
          title: "Review Added",
          description: "Your review has been added successfully",
          variant: "success",
        });
        // Refresh reviews after adding
        dispatch(fetchProductReviews(productDetails._id));
      } else if (result.error) {
        toast({
          title: "Error Adding Review",
          description:
            result.error.message || "Failed to add review. Please try again.",
          variant: "destructive",
        });
      }
    });
  };

  const handleDeleteReview = (reviewId) => {
    dispatch(deleteReview(reviewId)).then((result) => {
      if (result.type === "reviews/deleteReview/fulfilled") {
        toast({
          title: "Review deleted",
          description: "Your review has been deleted successfully",
          variant: "success",
        });
        // Refresh reviews after deleting
        dispatch(fetchProductReviews(productDetails._id));
      } else if (result.error) {
        toast({
          title: "Error",
          description: result.error.message || "Failed to delete review",
          variant: "destructive",
        });
      }
    });
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
                productDetails.salePrice ? "line-through" : ""
              }`}
            >
              ${productDetails.price}
            </p>
            {productDetails.salePrice && (
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
              ({productDetails.averageRating?.toFixed(1) || "0.0"})
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
          <div className="max-h-[300px] overflow-auto">
            <h2 className="text-2xl font-bold">Reviews</h2>
            {reviewsLoading ? (
              <div className="text-center p-4">Loading reviews...</div>
            ) : reviews?.length > 0 ? (
              <div className="space-y-4">
                {reviews.map((review) => (
                  <div
                    key={review._id}
                    className="flex gap-4 p-4 border rounded-lg"
                  >
                    <Avatar className="w-10 h-10 border">
                      <AvatarFallback>
                        {review.user?.name?.charAt(0) || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div className="flex flex-col gap-1">
                          <p className="text-sm font-bold">
                            {review.user?.name || "Anonymous"}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {formatDate(review.createdAt)}
                          </p>
                        </div>
                        {user?._id === review.user?._id && (
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDeleteReview(review._id)}
                          >
                            Delete
                          </Button>
                        )}
                      </div>
                      <div className="flex items-center gap-0.2 mt-1">
                        {[...Array(5)].map((_, index) => (
                          <StarIcon
                            key={index}
                            className={`w-4 h-4 ${
                              index < review.rating
                                ? "text-yellow-400 fill-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-sm font-medium text-muted-foreground mt-2">
                        {review.comment}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center p-4 text-muted-foreground">
                No reviews yet
              </div>
            )}
          </div>
          <div className="mt-6 flex gap-2">
            <div className="flex-1">
              <Input
                placeholder="Add a review"
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, index) => (
                  <StarIcon
                    key={index}
                    className={`w-5 h-5 cursor-pointer ${
                      index < rating
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"
                    }`}
                    onClick={() => setRating(index + 1)}
                  />
                ))}
              </div>
              <Button onClick={handleAddReview}>Add</Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetailDialog;

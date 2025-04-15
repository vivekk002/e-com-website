import { useToast } from "@/hooks/use-toast";
import {
  addReview,
  deleteReview,
  fetchAllReviews,
} from "@/store/shop/review-slice";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { StarIcon } from "lucide-react";

// Helper function to format date
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });
};

const ProductReview = ({ productId, productTitle, onReviewAdded }) => {
  const { toast } = useToast();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { reviews, isLoading: reviewsLoading } = useSelector(
    (state) => state.reviews
  );

  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(5);

  useEffect(() => {
    if (productId) {
      dispatch(fetchAllReviews(productId));
    }
  }, [dispatch, productId]);

  const handleAddReview = () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please login to add a review",
        variant: "destructive",
      });
      return;
    }

    if (!reviewText.trim()) {
      toast({
        title: "Review Required",
        description: "Please enter a review comment",
        variant: "destructive",
      });
      return;
    }

    dispatch(
      addReview({
        userId: user.userId,
        productId: productId,
        reviewData: {
          rating,
          comment: reviewText.trim(),
        },
      })
    ).then((result) => {
      if (result.payload.success) {
        setReviewText("");
        setRating(5);
        dispatch(fetchAllReviews(productId));
        toast({
          title: "Review Added",
          description: "Your review has been added successfully",
          variant: "success",
        });
        if (onReviewAdded) {
          onReviewAdded();
        }
      } else if (result.payload.success === false) {
        toast({
          title: "Error Adding Review",
          description:
            result.payload.message || "Failed to add review. Please try again.",
          variant: "destructive",
        });
      }
    });
  };

  const handleDeleteReview = (reviewId) => {
    dispatch(deleteReview({ reviewId })).then((result) => {
      if (result.payload.success) {
        dispatch(fetchAllReviews(productId));
        toast({
          title: "Review deleted",
          description: "Your review has been deleted successfully",
          variant: "success",
        });
        if (onReviewAdded) {
          onReviewAdded();
        }
      } else if (result.payload.success === false) {
        toast({
          title: "Error",
          description: result.payload.message || "Failed to delete review",
          variant: "destructive",
        });
      }
    });
  };

  return (
    <div>
      <div className="max-h-[300px] overflow-auto">
        <h2 className="text-2xl font-bold">Reviews for {productTitle}</h2>
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
                    {review?.userName.charAt(0).toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-1">
                      <p className="text-sm font-bold">
                        {review?.userName || "Anonymous"}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {formatDate(review.createdAt)}
                      </p>
                    </div>
                    {user?.userId === review.user?._id && (
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
  );
};

export default ProductReview;

import { Input } from "@/components/ui/input";
import { searchProducts, clearSearchResults } from "@/store/shop/search-slice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams, useLocation } from "react-router-dom";
import ProductTile from "@/components/shopping-view/product-tile";
import ProductDetailDialog from "@/components/shopping-view/product-details";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import {
  fetchProductDetails,
  setProductDetails,
} from "@/store/shop/product-slice";
import { useToast } from "@/hooks/use-toast";

const SearchProducts = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [dialogOpen, setDialogOpen] = useState(false);
  const dispatch = useDispatch();
  const { toast } = useToast();
  const location = useLocation();
  const { searchResults, isLoading, error } = useSelector(
    (state) => state.search
  );
  const { user } = useSelector((state) => state.auth);
  const { productDetails } = useSelector((state) => state.shoppingProducts);

  // Clear search results when component mounts
  useEffect(() => {
    // Clear search results when component mounts
    dispatch(clearSearchResults());

    // Check if there's a search query in the URL
    const queryFromUrl = searchParams.get("searchQuery");
    if (queryFromUrl) {
      // Only set the search query if it's not empty
      if (queryFromUrl.trim() !== "") {
        setSearchQuery(queryFromUrl);
        // Perform the search with the query from URL
        dispatch(searchProducts(queryFromUrl));
      }
    }

    return () => {
      // Cleanup when component unmounts
      setDialogOpen(false);
      dispatch(setProductDetails());
    };
  }, [dispatch, location.pathname, searchParams]);

  // Add effect to handle dialog state when location changes
  useEffect(() => {
    // Close dialog and clear product details when location changes
    setDialogOpen(false);
    dispatch(setProductDetails());
  }, [location.pathname, dispatch]);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchQuery(value);

    // Update URL params without triggering a search
    if (value.trim() !== "") {
      setSearchParams(new URLSearchParams(`?searchQuery=${value}`));
    } else {
      setSearchParams(new URLSearchParams());
    }
  };

  // Debounced search effect
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery && searchQuery.trim() !== "" && searchQuery.length > 2) {
        dispatch(searchProducts(searchQuery));
      } else if (searchQuery.trim() === "") {
        dispatch(clearSearchResults());
      }
    }, 500); // 500ms debounce

    return () => clearTimeout(timer);
  }, [searchQuery, dispatch]);

  const handleGetProductDetails = (productId) => {
    console.log("Search: handleGetProductDetails called with ID:", productId);
    dispatch(fetchProductDetails(productId));
  };

  // Add effect to open dialog when product details are fetched
  useEffect(() => {
    if (productDetails) {
      console.log("Search: Product details fetched, opening dialog");
      setDialogOpen(true);
    }
  }, [productDetails]);

  const handleAddToCart = (productId) => {
    if (!user) {
      // Redirect to login if user is not authenticated
      window.location.href = "/login";
      return;
    }

    // Use the correct user ID property
    const userId = user._id || user.userId;

    if (!userId) {
      toast({
        title: "Error",
        description: "User ID not found. Please log in again.",
        variant: "destructive",
      });
      return;
    }

    // Dispatch the addToCart action
    dispatch(addToCart({ userId, productId, quantity: 1 }))
      .unwrap()
      .then((result) => {
        if (result.success) {
          // Refresh cart items
          dispatch(fetchCartItems(userId));

          // Show success toast
          toast({
            title: "Product added to cart",
            description: "You can view your cart in the cart page",
            variant: "success",
          });
        } else {
          toast({
            title: "Error",
            description: result.message || "Failed to add product to cart",
            variant: "destructive",
          });
        }
      })
      .catch((error) => {
        toast({
          title: "Error",
          description: error.message || "Failed to add product to cart",
          variant: "destructive",
        });
      });
  };

  return (
    <div className="container mx-auto md:px-6 px-4 py-8">
      <div className="flex justify-center mb-8">
        <div className="flex w-full items-center">
          <Input
            type="text"
            placeholder="Search for products"
            className="w-full py-6"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
      </div>

      {isLoading && (
        <div className="text-center py-8">
          <p>Loading search results...</p>
        </div>
      )}

      {error && (
        <div className="text-center py-8 text-red-500">
          <p>Error: {error}</p>
        </div>
      )}

      {!isLoading &&
        !error &&
        searchResults.length === 0 &&
        searchQuery.length > 2 && (
          <div className="text-center py-8">
            <p>No products found for "{searchQuery}"</p>
          </div>
        )}

      {!isLoading && !error && searchResults.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-4">
            Search Results for "{searchQuery}"
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {searchResults.map((product) => (
              <ProductTile
                key={product._id}
                product={product}
                handleGetProductDetails={handleGetProductDetails}
                handleAddToCart={handleAddToCart}
              />
            ))}
          </div>
        </div>
      )}

      <ProductDetailDialog
        open={dialogOpen}
        setOpen={setDialogOpen}
        productDetails={productDetails}
      />
    </div>
  );
};

export default SearchProducts;

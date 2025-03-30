import ProductFilter from "@/components/shopping-view/filter";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { sortByOptions } from "@/config";

import { ArrowUpDown } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllFilteredProducts,
  fetchProductDetails,
} from "@/store/shop/product-slice";
import { useSearchParams } from "react-router-dom";
import ProductDetailDialog from "@/components/shopping-view/product-details";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { useToast } from "@/hooks/use-toast";
const ShoppingListing = () => {
  const dispatch = useDispatch();

  const { productList, productDetails } = useSelector(
    (state) => state.shoppingProducts
  );
  const { user } = useSelector((state) => state.auth);
  const { toast } = useToast();
  const [sortBy, setSortBy] = useState(null);
  const [filters, setFilters] = useState({});
  const [searchParams, setSearchParams] = useSearchParams();
  const [openDeatailsDialog, setOpenDeatailsDialog] = useState(false);

  const createSearchParamsHelper = (filterParams) => {
    const quaryParams = [];
    for (const [key, values] of Object.entries(filterParams)) {
      if (Array.isArray(values) && values.length > 0) {
        const paramsValue = values.join(",");
        quaryParams.push(`${key} = ${encodeURIComponent(paramsValue)}`);
      }
    }
    return quaryParams.join("&");
  };

  // fetch list of products

  const handleSortBy = (value) => {
    setSortBy(value);
  };

  const handleFilter = (getSectionId, getCurrentOption) => {
    let cpyFilters = { ...filters };
    const sectionExists = cpyFilters[getSectionId];
    if (!sectionExists) {
      cpyFilters = { ...cpyFilters, [getSectionId]: [getCurrentOption] };
    } else {
      const optionIndex = cpyFilters[getSectionId].indexOf(getCurrentOption);
      if (optionIndex === -1) {
        cpyFilters[getSectionId].push(getCurrentOption);
      } else {
        cpyFilters[getSectionId].splice(optionIndex, 1);
        if (cpyFilters[getSectionId].length === 0) {
          delete cpyFilters[getSectionId];
        }
      }
    }

    setFilters(cpyFilters);
    sessionStorage.setItem("filters", JSON.stringify(cpyFilters));
  };

  const handleGetProductDetails = (getCurrentProductId) => {
    dispatch(fetchProductDetails(getCurrentProductId));
  };

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

  useEffect(() => {
    setSortBy("price-asc");
    setFilters(JSON.parse(sessionStorage.getItem("filters")) || {});
  }, []);

  useEffect(() => {
    if (filters && Object.keys(filters).length > 0) {
      const createQuaryString = createSearchParamsHelper(filters);
      setSearchParams(new URLSearchParams(createQuaryString));
    }
  }, [filters]);

  useEffect(() => {
    dispatch(
      fetchAllFilteredProducts({ filterParams: filters, sortParams: sortBy })
    );
  }, [dispatch, filters, sortBy]);

  useEffect(() => {
    if (productDetails) {
      setOpenDeatailsDialog(true);
    }
  }, [productDetails]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6 p-4 md:p-6">
      <ProductFilter filters={filters} handleFilter={handleFilter} />
      <div className="bg-background w-full rounded-sm shadow-sm">
        <div className="flex items-center justify-between p-4 border-b">
          <ProductDetailDialog
            open={openDeatailsDialog}
            setOpen={setOpenDeatailsDialog}
            productDetails={productDetails}
          />
          <h2 className="text-lg font-bold mr-2">All Products</h2>
          <div className="flex items-center gap-3">
            <span className="text-muted-foreground">
              No. of Products: {productList.length}
            </span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <ArrowUpDown className="w-4 h-4" />
                  <span>Sort by</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[200px]">
                <DropdownMenuRadioGroup
                  value={sortBy}
                  onValueChange={handleSortBy}
                >
                  {sortByOptions.map((sortItems) => (
                    <DropdownMenuRadioItem
                      value={sortItems.id}
                      key={sortItems.id}
                    >
                      {sortItems.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          {productList && productList.length > 0 ? (
            productList.map((productItem) => (
              <ShoppingProductTile
                key={productItem._id || productItem.id}
                product={productItem}
                handleGetProductDetails={handleGetProductDetails}
                handleAddToCart={handleAddToCart}
              />
            ))
          ) : (
            <div className="flex items-center justify-center h-full">
              <p>No products found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShoppingListing;

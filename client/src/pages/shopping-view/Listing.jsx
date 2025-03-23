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
import { fetchAllFilteredProducts } from "@/store/shop/product-slice";

const ShoppingListing = () => {
  const dispatch = useDispatch();
  const { productList } = useSelector((state) => state.shoppingProducts);
  const [sortBy, setSortBy] = useState(null);
  const [filters, setFilters] = useState(null);
  console.log("filters", filters);

  // fetch list of products

  const handleSortBy = (value) => {
    setSortBy(value);
  };

  const handleFiter = (getSectionId, getCurrentOption) => {
    let cpyFilters = { ...filters };
    // Check if the section exists in filters
    const sectionExists = cpyFilters[getSectionId];

    if (!sectionExists) {
      // If section doesn't exist, create new section with first option
      cpyFilters = { ...cpyFilters, [getSectionId]: [getCurrentOption] };
    } else {
      // If section exists, check if option is already in the array
      const optionIndex = cpyFilters[getSectionId].indexOf(getCurrentOption);

      if (optionIndex === -1) {
        // Option not found, add it to section
        cpyFilters[getSectionId].push(getCurrentOption);
      } else {
        // Option found, remove it from section
        cpyFilters[getSectionId].splice(optionIndex, 1);

        // Remove section if empty
        if (cpyFilters[getSectionId].length === 0) {
          delete cpyFilters[getSectionId];
        }
      }
    }

    setFilters(cpyFilters);
    sessionStorage.setItem("filters", JSON.stringify(cpyFilters));
  };

  useEffect(() => {
    setSortBy("price-asc");
    setFilters(JSON.parse(sessionStorage.getItem("filters")) || {});
  }, []);

  useEffect(() => {
    dispatch(fetchAllFilteredProducts());
  }, [dispatch]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6 p-4 md:p-6">
      <ProductFilter filters={filters} handleFiter={handleFiter} />
      <div className="bg-background w-full rounded-sm shadow-sm">
        <div className="flex items-center justify-between p-4 border-b">
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
              <ShoppingProductTile product={productItem} />
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

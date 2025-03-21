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

import { ArrowUpDown, FilterIcon } from "lucide-react";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

const ShoppingListing = () => {
  const dispatch = useDispatch();
  // fetch list of products

  return (
    <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6 p-4 md:p-6">
      <ProductFilter />
      <div className="bg-background w-full rounded-sm shadow-sm">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-bold mr-2">All Products</h2>
          <div className="flex items-center gap-3">
            <span className="text-muted-foreground">No. of products</span>
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
                <DropdownMenuRadioGroup>
                  {sortByOptions.map((sortItems) => (
                    <DropdownMenuRadioItem key={sortItems.id}>
                      {sortItems.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
          <ShoppingProductTile />
        </div>
      </div>
    </div>
  );
};

export default ShoppingListing;

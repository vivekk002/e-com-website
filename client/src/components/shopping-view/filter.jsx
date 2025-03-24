import { productFiltersOptions } from "@/config";

import React, { Fragment, useState } from "react";
import { Label } from "../ui/label";

import { Separator } from "../ui/separator";
import { Checkbox } from "../ui/checkbox";

const ProductFilter = ({ filters, handleFilter }) => {
  const [expandedSections, setExpandedSections] = useState({});

  const toggleSection = (keyItems) => {
    setExpandedSections((prev) => ({
      ...prev,
      [keyItems]: !prev[keyItems],
    }));
  };

  return (
    <div className="bg-background rounded-lg shadow-sm">
      <div className="border-b p-2">
        <h1 className="text-lg font-bold">Filters</h1>
      </div>
      <div className="p-2 space-y-2">
        {Object.keys(productFiltersOptions).map((keyItems) => {
          const options = productFiltersOptions[keyItems];
          const isExpanded = expandedSections[keyItems];
          const displayedOptions = isExpanded ? options : options.slice(0, 7);

          return (
            <Fragment key={keyItems}>
              <div className="filter-section py-2 border-b">
                <h3 className="text-base font-semibold mb-2">{keyItems}</h3>
                <div className="grid gap-2">
                  {displayedOptions.map((option) => (
                    <Label
                      key={option.label}
                      className="flex items-center gap-3 text-sm text-gray-700 hover:text-gray-900 cursor-pointer"
                    >
                      <Checkbox
                        className="h-4 w-4"
                        onCheckedChange={() =>
                          handleFilter(keyItems, option.id)
                        }
                        checked={
                          filters &&
                          Object.keys(filters).length > 0 &&
                          filters[keyItems] &&
                          filters[keyItems].indexOf(option.id) > -1
                        }
                      />
                      {option.label}
                    </Label>
                  ))}

                  {options.length > 7 && (
                    <span
                      onClick={() => toggleSection(keyItems)}
                      className="text-sm text-blue-600 hover:text-blue-800 font-medium mt-1 cursor-pointer"
                    >
                      {isExpanded
                        ? "Show Less"
                        : `Show More (${options.length - 7} more)`}
                    </span>
                  )}
                </div>
              </div>
              <Separator />
            </Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default ProductFilter;

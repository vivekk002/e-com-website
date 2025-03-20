import React from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";

const AdminProductTile = ({
  product,
  setEditedProductId,
  setFormData,
  setOpenCreateProductDialog,
  handleDelete,
}) => {
  const dispatch = useDispatch();
  return (
    <Card className="w-[200px] h-[380px]">
      <div className="flex flex-col h-full">
        <div className="relative aspect-square">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-[250px] object-cover rounded-t-lg "
          />
        </div>
        <CardContent className="flex-grow flex flex-col">
          <h2 className="text-sm mb-2 font-semibold mt-2">{product.title}</h2>

          <div className="mt-auto">
            <div className="flex flex-row items-center gap-2 justify-between">
              <span
                className={`${
                  product.salePrice > 0 ? "line-through " : ""
                }font-semibold text-sm text-primary`}
              >
                ${product.price}
              </span>
              {product.salePrice > 0 && (
                <span className="text-sm font-bold ">${product.salePrice}</span>
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <Button
            size="sm"
            onClick={() => {
              setEditedProductId(product._id);

              setFormData(product);
              setOpenCreateProductDialog(true);
            }}
          >
            Edit
          </Button>
          <Button
            size="sm"
            onClick={() => {
              handleDelete(product._id);
            }}
          >
            Delete
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
};

export default AdminProductTile;

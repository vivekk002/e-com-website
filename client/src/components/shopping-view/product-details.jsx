import React from "react";
import { Dialog, DialogContent } from "../ui/dialog";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { StarIcon } from "lucide-react";

const ProductDetailDialog = ({ open, setOpen, productDetails }) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="grid grid-cols-2 gap-8 sm:p-12 max-w-[90vw] sm:max-w-[80vw] lg:max-w-[70vw]">
        <div className="relative overflow-hidden rounded-lg">
          <img
            src={productDetails.image}
            alt={productDetails.name}
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
            {productDetails.salePrice ? (
              <p className="text-xl text-green-600 font-bold text-primary">
                ${productDetails.salePrice}
              </p>
            ) : null}
          </div>
          <div className="flex items-center gap-2 mt-2">
            <div className="flex items-centergap-0.2">
              <StarIcon className="w-5 h-5 text-yellow-500 fill-primary" />
              <StarIcon className="w-5 h-5 text-yellow-500 fill-primary" />
              <StarIcon className="w-5 h-5 text-yellow-500 fill-primary" />
              <StarIcon className="w-5 h-5 text-yellow-500 fill-primary" />
              <StarIcon className="w-5 h-5 text-yellow-500 fill-primary" />
            </div>
            <span className="text-sm text-muted-foreground">(4.5) </span>
          </div>
          <div className="flex items-center gap-3 mb-3 mt-5">
            <Button className="w-full">Add to Cart</Button>
            <Button className="w-full">Buy Now</Button>
          </div>
          <Separator />
          <div className="max-h-[300px] overflow-auto">
            <h2 className="text-2xl font-bold">Reviews</h2>
            <div className="grid gap-6">
              <div className="flex gap-4">
                <Avatar className="w-10 h-10 border">
                  <AvatarFallback>VK</AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-bold">Vivek</p>
                  <p className="text-sm text-muted-foreground">12/12/2024</p>
                </div>
                <div className="flex items-centergap-0.2">
                  <StarIcon className="w-5 h-5 text-yellow-500 fill-primary" />
                  <StarIcon className="w-5 h-5 text-yellow-500 fill-primary" />
                  <StarIcon className="w-5 h-5 text-yellow-500 fill-primary" />
                  <StarIcon className="w-5 h-5 text-yellow-500 fill-primary" />
                  <StarIcon className="w-5 h-5 text-yellow-500 fill-primary" />
                </div>
                <p className="text-sm font-medium text-muted-foreground">
                  This is a review
                </p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetailDialog;

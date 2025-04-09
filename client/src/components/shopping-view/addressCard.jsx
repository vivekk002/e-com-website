import React from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { CheckCircle } from "lucide-react";

const AddressCard = ({
  addressInfo,
  handleDelete,
  handleEdit,
  setCurrentSelectedAddress,
  currentSelectedAddress,
}) => {
  const isSelected =
    currentSelectedAddress && currentSelectedAddress._id === addressInfo._id;

  return (
    <Card
      onClick={
        setCurrentSelectedAddress
          ? () => setCurrentSelectedAddress(addressInfo)
          : null
      }
      className={`relative cursor-pointer transition-all duration-200 ${
        isSelected
          ? "border-2 border-green-500 shadow-lg bg-green-50"
          : "border border-gray-200 hover:border-green-300 hover:shadow-md"
      }`}
    >
      {isSelected && (
        <div className="absolute top-2 right-2 bg-green-500 rounded-full p-1">
          <CheckCircle className="h-4 w-4 text-white" />
        </div>
      )}
      <CardContent className="grid gap-4 p-4">
        <Label
          className={`${
            isSelected ? "font-semibold text-green-700" : "text-gray-700"
          }`}
        >
          Address : {addressInfo?.address}
        </Label>
        <Label
          className={`${
            isSelected ? "font-semibold text-green-700" : "text-gray-700"
          }`}
        >
          City : {addressInfo?.city}
        </Label>
        <Label
          className={`${
            isSelected ? "font-semibold text-green-700" : "text-gray-700"
          }`}
        >
          State : {addressInfo?.state}
        </Label>
        <Label
          className={`${
            isSelected ? "font-semibold text-green-700" : "text-gray-700"
          }`}
        >
          Pincode : {addressInfo?.pincode}
        </Label>
        <Label
          className={`${
            isSelected ? "font-semibold text-green-700" : "text-gray-700"
          }`}
        >
          Phone : {addressInfo?.phone}
        </Label>
        <Label
          className={`${
            isSelected ? "font-semibold text-green-700" : "text-gray-700"
          }`}
        >
          Notes : {addressInfo?.notes}
        </Label>
      </CardContent>
      <CardFooter className="flex justify-between gap-3">
        <Button onClick={() => handleEdit(addressInfo)}>Edit</Button>
        <Button variant="destructive" onClick={() => handleDelete(addressInfo)}>
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AddressCard;

import React from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Label } from "../ui/label";
import { Button } from "../ui/button";

const AddressCard = ({ addressInfo, handleDelete, handleEdit }) => {
  return (
    <Card>
      <CardContent className="grid gap-4 p-4 ">
        <Label> Address : {addressInfo?.address}</Label>
        <Label> City : {addressInfo?.city}</Label>
        <Label> State : {addressInfo?.state}</Label>
        <Label> Pincode : {addressInfo?.pincode}</Label>
        <Label> Phone : {addressInfo?.phone}</Label>
        <Label> Notes : {addressInfo?.notes}</Label>
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

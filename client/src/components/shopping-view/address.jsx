import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import CommonForm from "../common/form";
import { addressFormControls } from "@/config";
import { useDispatch, useSelector } from "react-redux";
import {
  addAddress,
  fetchAddressList,
  deleteAddress,
  updateAddress,
} from "@/store/shop/address-slice";
import AddressCard from "./addressCard";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";

const initialAddressFormData = {
  address: "",
  city: "",
  state: "",
  pincode: "",
  phone: "",
  notes: "",
};

const Address = () => {
  const [formData, setFormData] = useState(initialAddressFormData);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { addressList, isLoading } = useSelector((state) => state.addressData);
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const { toast } = useToast();
  const [addressToDelete, setAddressToDelete] = useState(null);

  const handleManageAddress = async (event) => {
    event.preventDefault();

    if (addressList.length >= 3 && currentEditedId === null) {
      setFormData(initialAddressFormData);
      toast({
        title: "Can't add new address",
        description: "You can only add 3 addresses",
        variant: "destructive",
      });
      return;
    }

    if (currentEditedId !== null) {
      dispatch(
        updateAddress({
          userId: user.userId,
          addressId: currentEditedId,
          formdata: formData,
        })
      ).then((data) => {
        if (data.payload.success) {
          dispatch(fetchAddressList(user.userId));
          setFormData(initialAddressFormData);
          setCurrentEditedId(null);
          toast({
            title: "Success",
            description: "Address updated successfully",
          });
        } else {
          toast({
            title: "Error",
            description: "Failed to update address",
            variant: "destructive",
          });
        }
      });
    } else {
      dispatch(addAddress({ ...formData, userId: user.userId })).then(
        (data) => {
          if (data.payload.success) {
            dispatch(fetchAddressList(user.userId));
            setFormData(initialAddressFormData);
            toast({
              title: "Success",
              description: "Address added successfully",
            });
          } else {
            toast({
              title: "Error",
              description: "Failed to add address",
              variant: "destructive",
            });
          }
        }
      );
    }
  };

  const handleDelete = (getCurrAddress) => {
    setAddressToDelete(getCurrAddress);
  };

  const confirmDelete = () => {
    if (addressToDelete) {
      dispatch(
        deleteAddress({ userId: user.userId, addressId: addressToDelete._id })
      ).then((data) => {
        if (data.payload.success) {
          dispatch(fetchAddressList(user.userId));
          toast({
            title: "Success",
            description: "Address deleted successfully",
            variant: "success",
          });
        } else {
          toast({
            title: "Error",
            description: "Failed to delete address",
            variant: "destructive",
          });
        }
      });
      setAddressToDelete(null);
    }
  };

  const cancelDelete = () => {
    setAddressToDelete(null);
  };

  const handleEdit = (getCurrAddress) => {
    setCurrentEditedId(getCurrAddress._id);
    setFormData({
      ...formData,
      address: getCurrAddress?.address,
      city: getCurrAddress?.city,
      state: getCurrAddress?.state,
      pincode: getCurrAddress?.pincode,
      phone: getCurrAddress?.phone,
      notes: getCurrAddress?.notes,
    });
  };

  const isFormValid = () => {
    return Object.keys(formData)
      .map((key) => formData[key].trim() !== "")
      .every((item) => item);
  };

  useEffect(() => {
    dispatch(fetchAddressList(user.userId));
  }, [dispatch, user.userId]);

  return (
    <Card>
      <div className="mb-5 p-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {addressList && addressList.length > 0
          ? addressList.map((singleAddress) => (
              <AddressCard
                key={singleAddress._id}
                addressInfo={singleAddress}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
              />
            ))
          : null}
      </div>

      <CardHeader>
        <CardTitle>
          {currentEditedId !== null ? "Edit Address" : "Add New Address"}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <CommonForm
          formControls={addressFormControls}
          formData={formData}
          setFormData={setFormData}
          buttonText={currentEditedId !== null ? "Edit Address" : "Add Address"}
          onSubmit={handleManageAddress}
          isBtnDisabled={!isFormValid()}
        />
      </CardContent>

      <AlertDialog
        open={!!addressToDelete}
        onOpenChange={() => setAddressToDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Do you want to delete this address?
            </AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={cancelDelete}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
};

export default Address;

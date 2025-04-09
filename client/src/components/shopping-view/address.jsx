import React, { useEffect, useState } from "react";
import { Card, CardContent } from "../ui/card";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";

const initialAddressFormData = {
  address: "",
  city: "",
  state: "",
  pincode: "",
  phone: "",
  notes: "",
};

const Address = ({ setCurrentSelectedAddress, currentSelectedAddress }) => {
  const [formData, setFormData] = useState(initialAddressFormData);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { addressList, isLoading } = useSelector((state) => state.addressData);
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const { toast } = useToast();
  const [addressToDelete, setAddressToDelete] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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

    try {
      if (currentEditedId !== null) {
        const response = await dispatch(
          updateAddress({
            userId: user.userId,
            addressId: currentEditedId,
            formdata: formData,
          })
        );

        if (response.payload.success) {
          dispatch(fetchAddressList(user.userId));
          setFormData(initialAddressFormData);
          setCurrentEditedId(null);
          setIsDialogOpen(false);
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
      } else {
        const response = await dispatch(
          addAddress({ ...formData, userId: user.userId })
        );

        if (response.payload.success) {
          dispatch(fetchAddressList(user.userId));
          setFormData(initialAddressFormData);
          setIsDialogOpen(false);
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
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while saving the address",
        variant: "destructive",
      });
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
      address: getCurrAddress?.address,
      city: getCurrAddress?.city,
      state: getCurrAddress?.state,
      pincode: getCurrAddress?.pincode,
      phone: getCurrAddress?.phone,
      notes: getCurrAddress?.notes,
    });
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setCurrentEditedId(null);
    setFormData(initialAddressFormData);
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
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Your Addresses</h3>
          <Button
            onClick={() => setIsDialogOpen(true)}
            className="flex items-center gap-2"
            disabled={addressList.length >= 3}
          >
            <Plus className="h-4 w-4" />
            Add New Address
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {addressList && addressList.length > 0 ? (
            addressList.map((singleAddress) => (
              <AddressCard
                key={singleAddress._id}
                addressInfo={singleAddress}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
                setCurrentSelectedAddress={setCurrentSelectedAddress}
                currentSelectedAddress={currentSelectedAddress}
              />
            ))
          ) : (
            <div className="col-span-2 text-center text-gray-500 py-4">
              No addresses found. Add a new address to continue.
            </div>
          )}
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={handleDialogClose}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              {currentEditedId ? "Edit Address" : "Add New Address"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleManageAddress}>
            <div className="space-y-4 py-4">
              <CommonForm
                formControls={addressFormControls}
                formData={formData}
                setFormData={setFormData}
                buttonText=""
                onSubmit={() => {}}
                isBtnDisabled={!isFormValid()}
                hideSubmitButton={true}
              />
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={handleDialogClose}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={!isFormValid()}>
                {currentEditedId ? "Update Address" : "Add Address"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

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

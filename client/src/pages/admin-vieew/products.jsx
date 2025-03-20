import CommonForm from "@/components/common/form";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import React, { Fragment, useEffect, useState } from "react";
import { addProductsFormElements } from "@/config";
import ProductImageUpload from "@/components/admin-view/imageUpload";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewProduct,
  fetchAllProducts,
  editProduct,
  deleteProduct,
} from "@/store/admin/product-slice";
import { useToast } from "@/hooks/use-toast";
import AdminProductTile from "@/components/admin-view/product-tile";
const initialFormData = {
  image: null,
  title: "",
  description: "",
  category: "",
  brand: "",
  price: "",
  salePrice: "",
  totalStock: "",
};

const Adminproducts = () => {
  const [openCreateProductDialog, setOpenCreateProductDialog] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLodingState, setImageLodingState] = useState(false);
  const [editedProductId, setEditedProductId] = useState(null);

  const { productList } = useSelector((state) => state.adminProducts);
  const dispatch = useDispatch();
  const { toast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editedProductId !== null) {
      dispatch(editProduct({ id: editedProductId, formData })).then((data) => {
        if (data?.payload?.success) {
          dispatch(fetchAllProducts());
          setFormData(initialFormData);
          setOpenCreateProductDialog(false);
          setEditedProductId(null);
          setImageFile(null);
          toast({
            title: "Product Updated Successfully",
            description: "Product Updated Successfully",
          });
        }
      });
    } else {
      dispatch(
        addNewProduct({
          ...formData,
          image: uploadedImageUrl,
        })
      ).then((data) => {
        if (data?.payload?.success) {
          dispatch(fetchAllProducts());
          setOpenCreateProductDialog(false);
          setImageFile(null);
          setFormData(initialFormData);
          toast({
            title: "Product Added Successfully",
            description: "Product Added Successfully",
          });
        }
      });
    }
  };

  const isBtnDisabled = () => {
    return Object.keys(formData)
      .map((key) => formData[key] !== "")
      .every((item) => item);
  };

  const handleDelete = (deleteProductId) => {
    dispatch(deleteProduct(deleteProductId)).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllProducts());

        toast({
          title: "Product Deleted Successfully",
          description: "Product Deleted Successfully",
        });
      }
    });
  };

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  return (
    <Fragment>
      <div className="md-5 flex justify-end w-full ">
        <Button className="" onClick={() => setOpenCreateProductDialog(true)}>
          Add New Product
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4">
        {productList && productList.length > 0
          ? productList.map((productItem) => (
              <AdminProductTile
                key={productItem._id || productItem.id}
                setEditedProductId={setEditedProductId}
                handleDelete={handleDelete}
                setFormData={setFormData}
                product={productItem}
                setOpenCreateProductDialog={setOpenCreateProductDialog}
                className="w-full"
              />
            ))
          : null}
      </div>
      <Sheet
        open={openCreateProductDialog}
        onOpenChange={() => {
          setOpenCreateProductDialog(false);
          setEditedProductId(null);
          setFormData(initialFormData);
        }}
      >
        <SheetContent side="right" className="max-w-[500px] overflow-auto">
          <SheetHeader>
            <SheetTitle>
              {editedProductId !== null
                ? "Edit the product"
                : "Add new product"}
            </SheetTitle>
          </SheetHeader>
          <ProductImageUpload
            imageFile={imageFile}
            setImageFile={setImageFile}
            uploadedImageUrl={uploadedImageUrl}
            setUploadedImageUrl={setUploadedImageUrl}
            setImageLodingState={setImageLodingState}
            imageLodingState={imageLodingState}
            isEdited={editedProductId !== null}
          />
          <div className="flex flex-col gap-4 py-6">
            <CommonForm
              formControls={addProductsFormElements}
              formData={formData}
              setFormData={setFormData}
              isBtnDisabled={!isBtnDisabled()}
              buttonText={
                editedProductId !== null ? "Update Product" : "Add Product"
              }
              onSubmit={handleSubmit}
            />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
};

export default Adminproducts;

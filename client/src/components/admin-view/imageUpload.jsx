import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import React, { useEffect, useRef } from "react";
import { UploadCloudIcon, FileIcon, XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Skeleton } from "../ui/skeleton";
const ProductImageUpload = ({
  imageFile,
  setImageFile,
  uploadedImageUrl,
  setUploadedImageUrl,
  setImageLodingState,
  imageLodingState,
  isEdited,
}) => {
  const inputRef = useRef(null);

  const handleImageFileChange = (e) => {
    const file = e.target.files?.[0];

    console.log(file);

    if (file) {
      setImageFile(file);
    }
  };
  const handleDragOver = (e) => {
    e.preventDefault();
  };
  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) {
      setImageFile(droppedFile);
    }
  };
  const handleRemoveImage = () => {
    setImageFile(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const uploadImageToCloudinary = async () => {
    setImageLodingState(true);
    const data = new FormData();
    data.append("my_file", imageFile);
    const response = await axios.post(
      "http://localhost:5000/api/admin/products/upload-image",
      data
    );

    if (response?.data?.success) {
      setUploadedImageUrl(response.data.url);
      setImageLodingState(false);
    }
  };

  useEffect(() => {
    if (imageFile !== null) uploadImageToCloudinary();
  }, [imageFile]);

  return (
    <div className="w-full max-w-md mx-auto mt-4">
      <Label className="text-lg font-semibold mb-2 block">Upload Image</Label>
      <div
        className="border-2 border-dashed border-gray-300 rounded-md p-4"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <Input
          id="image-upload"
          type="file"
          className="hidden"
          ref={inputRef}
          onChange={handleImageFileChange}
          disabled={isEdited}
        />
        {!imageFile ? (
          <Label
            htmlFor="image-upload"
            className={`${
              isEdited ? "cursor-not-allowed" : "cursor-pointer"
            } flex flex-col items-center justify-center h-32 `}
          >
            <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2" />
            <span>Drag and drop or click to upload image</span>
          </Label>
        ) : imageLodingState ? (
          <Skeleton className=" h-10 bg-gray-200" />
        ) : (
          <div className="flex flex-col items-center justify-center">
            <div className="flex flex-col items-center justify-center">
              <FileIcon className="w-8 h-8 text-primary mr-2" />
            </div>
            <p className="text-sm text-medium"> {imageFile.name} </p>
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-foreground"
              onClick={handleRemoveImage}
            >
              <XIcon className="w-4 h-4" />
              <span className="sr-only">Remove Image</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductImageUpload;

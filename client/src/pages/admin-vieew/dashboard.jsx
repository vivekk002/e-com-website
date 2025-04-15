import ProductImageUpload from "@/components/admin-view/imageUpload";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  deleteFeatureImage,
  fetchFeatureImage,
  setFeatureImage,
} from "@/store/common/features-slice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const AdminDashboard = () => {
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLodingState, setImageLodingState] = useState(false);
  const { toast } = useToast();

  const dispatch = useDispatch();
  const { featureImage, isLoading } = useSelector(
    (state) => state.featureImages
  );

  console.log(featureImage);

  const handleUpload = async () => {
    try {
      await dispatch(setFeatureImage(uploadedImageUrl)).unwrap();
      setUploadedImageUrl("");
      setImageFile(null);
      setImageLodingState(false);

      dispatch(fetchFeatureImage());

      toast({
        title: "Success",
        description: "Feature Image Uploaded Successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "Failed to upload image",
        variant: "destructive",
      });
    }
  };

  const handleImageDelete = async (imageId) => {
    try {
      await dispatch(deleteFeatureImage(imageId)).unwrap();
      dispatch(fetchFeatureImage());

      toast({
        title: "Success",
        description: "Feature Image Deleted Successfully",
      });
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  useEffect(() => {
    dispatch(fetchFeatureImage());
  }, [dispatch]);

  return (
    <div className="p-6">
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Upload Feature Image</h3>
        <ProductImageUpload
          imageFile={imageFile}
          setImageFile={setImageFile}
          uploadedImageUrl={uploadedImageUrl}
          setUploadedImageUrl={setUploadedImageUrl}
          setImageLodingState={setImageLodingState}
          imageLodingState={imageLodingState}
        />
        <Button
          className="mt-4 w-full"
          onClick={handleUpload}
          disabled={!uploadedImageUrl || imageLodingState || isLoading}
        >
          {imageLodingState || isLoading ? "Uploading..." : "Upload"}
        </Button>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-4">Feature Images</h3>
        {isLoading ? (
          <div className="text-center py-4">Loading...</div>
        ) : featureImage && featureImage.length > 0 ? (
          <div className="flex flex-wrap gap-4 mt-4">
            {featureImage.map((image, index) => (
              <div
                key={index}
                className="h-[200px] w-[200px] relative gap-4 p-5"
              >
                <img
                  src={image.image}
                  alt={`Feature Image ${index + 1}`}
                  className="object-cover w-full h-full mt-2"
                />
                <Button
                  className="absolute p-4 mb-5 w-full mt-2"
                  variant="destructive"
                  onClick={() => handleImageDelete(image._id)}
                >
                  Delete
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-4 text-gray-500">
            No feature images uploaded yet
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;

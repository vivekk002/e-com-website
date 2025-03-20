const cloudinary = require("cloudinary").v2;
const multer = require("multer");

cloudinary.config({
  cloud_name: "dlak3u6ll",
  api_key: "964227268366365",
  api_secret: "ZbG8bmEpaD86Ku7az9mFwz2Z9KY",
});

const storage = new multer.memoryStorage();
const upload = multer({ storage });

async function imageUploadUtil(file) {
  const result = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
  });
  return result;
}

module.exports = {
  upload,
  imageUploadUtil,
};

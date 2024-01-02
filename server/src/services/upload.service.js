"use strict";

const { cloudinary } = require("../configs/cloudinary.config");

// 1. upload from url image
const uploadImageFromUrl = async () => {
  try {
    const urlImage =
      "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lmeejgcm2fof90";
    const folderName = "product/shopId",
      newFileName = "testdemo";

    const result = await cloudinary.uploader.upload(urlImage, {
      public_id: newFileName,
      folder: folderName,
    });
    console.log(result);
    return result;
  } catch (error) {
    console.error("Error uploading image::", error);
  }
};

// 2. upload image from local

const uploadImageFromLocal = async ({ path, folderName = "product/0811" }) => {
  try {
    const result = await cloudinary.uploader.upload(path, {
      public_id: "thumb",
      folder: folderName,
    });
    console.log(result);
    return {
      image_url: result.secure_url,
      thumb_url: await cloudinary.url(result.public_id, {
        height: 100,
        width: 100,
        format: "jpg",
      }),
    };
  } catch (error) {
    console.error("Error uploading image::", error);
  }
};

const uploadImageFromLocalFiles = async ({
  files,
  folderName = "product/0811",
}) => {
  try {
    console.log(`files::`, files.folderName);
    if (!files.length) return;
    const uploadedUrls = [];
    for (const file of files) {
      const result = await cloudinary.uploader.upload(file.path, {
        folder: folderName,
      });

      uploadedUrls.push({
        image_url: result.secure_url,
        thumb_url: await cloudinary.url(result.public_id, {
          height: 100,
          width: 100,
          format: "jpg",
        }),
      });
    }

    return uploadedUrls;
  } catch (error) {
    console.error("Error uploading image::", error);
  }
};

module.exports = {
  uploadImageFromUrl,
  uploadImageFromLocal,
  uploadImageFromLocalFiles,
};

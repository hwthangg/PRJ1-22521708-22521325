import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

cloudinary.config({
  cloud_name: "djnjcux2c",
  api_key: "839363645916928",
  api_secret: "_TMCp6VDkpcsaFcqUORz_km7ON8",
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "QLDV",
    allowed_formats: ["jpg", "png", "jpeg", "webp", "pdf"],
  },
});
export { cloudinary, storage };

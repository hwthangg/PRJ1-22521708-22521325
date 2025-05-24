import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../cloudinary.js';

const fileStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'QLDV/files',
    resource_type: 'raw', // Bắt buộc để upload file không phải ảnh/video
  },
});

const uploadFile = multer({ storage: fileStorage });

export default uploadFile;

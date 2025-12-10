import express from 'express';
import multer from 'multer';
import path from "path";
import { protect } from '../middleware/auth.middleware.js';
import {
  getProfile,
  updateProfile,
  uploadImage
} from '../controllers/profile.controller.js';

const router = express.Router();

 const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = req.body.type === 'avatar' 
      ? 'uploads/avatars' 
      : 'uploads/covers';
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'img-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
   if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },  
  fileFilter: fileFilter
});

 router.get('/:userId', getProfile);
router.patch('/:userId', protect, updateProfile);
router.post('/:userId/upload', protect, upload.single('image'), uploadImage);

export default router;
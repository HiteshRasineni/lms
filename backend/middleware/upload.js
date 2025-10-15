import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../config/cloudinary.js';

// Storage for course materials (videos, PDFs, images)
const courseStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'lms/course-materials',
    resource_type: 'auto', // auto-detect file type
    allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'pdf', 'mp4', 'mov', 'avi', 'doc', 'docx'],
  },
});

// Storage for assignments
const assignmentStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'lms/assignments',
    resource_type: 'auto',
    allowed_formats: ['pdf', 'doc', 'docx', 'zip', 'txt'],
  },
});

// Storage for thumbnails
const thumbnailStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'lms/thumbnails',
    resource_type: 'image',
    allowed_formats: ['jpg', 'jpeg', 'png', 'gif'],
  },
});

// Storage for profile pictures
const profileStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'lms/profiles',
    resource_type: 'image',
    allowed_formats: ['jpg', 'jpeg', 'png'],
  },
});

export const uploadCourseMaterial = multer({ storage: courseStorage });
export const uploadAssignment = multer({ storage: assignmentStorage });
export const uploadThumbnail = multer({ storage: thumbnailStorage });
export const uploadProfile = multer({ storage: profileStorage });
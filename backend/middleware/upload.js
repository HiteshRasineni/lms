import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

/**
 * Dynamically determine Cloudinary resource_type based on file mimetype.
 * Ensures PDFs, DOCX, ZIP, videos, etc. are uploaded as 'raw',
 * while images go under 'image'.
 */
const getResourceType = (file) => {
  if (file.mimetype.startsWith("image/")) return "image";
  if (
    file.mimetype.startsWith("video/") ||
    file.mimetype === "application/pdf" ||
    file.mimetype === "application/msword" ||
    file.mimetype ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
    file.mimetype === "application/zip" ||
    file.mimetype === "text/plain"
  ) {
    return "raw";
  }
  return "auto";
};

// === Course materials (PDFs, videos, images) ===
const courseStorage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => ({
    folder: "lms/course-materials",
    resource_type: getResourceType(file),
    allowed_formats: [
      "jpg",
      "jpeg",
      "png",
      "gif",
      "pdf",
      "mp4",
      "mov",
      "avi",
      "doc",
      "docx",
      "zip",
      "txt",
    ],
  }),
});

// === Assignments ===
const assignmentStorage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => ({
    folder: "lms/assignments",
    resource_type: getResourceType(file),
    allowed_formats: ["pdf", "doc", "docx", "zip", "txt"],
  }),
});

// === Thumbnails (always images) ===
const thumbnailStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "lms/thumbnails",
    resource_type: "image",
    allowed_formats: ["jpg", "jpeg", "png", "gif"],
  },
});

// === Profile pictures (always images) ===
const profileStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "lms/profiles",
    resource_type: "image",
    allowed_formats: ["jpg", "jpeg", "png"],
  },
});

// === Export ready-to-use uploaders ===
export const uploadCourseMaterial = multer({ storage: courseStorage });
export const uploadAssignment = multer({ storage: assignmentStorage });
export const uploadThumbnail = multer({ storage: thumbnailStorage });
export const uploadProfile = multer({ storage: profileStorage });

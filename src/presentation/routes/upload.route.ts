// src/infrastructure/routes/user-routes.ts
import { Router } from "express";
import { fileFilter, fileFilterPdf } from "../../shared/helper/multer.config";
import multer from "multer";
import { UploadControllers } from "../controllers/upload.controller";

const uploadRouter = Router();

const uploadController = new UploadControllers();

function fileStorage(folderName: string) {
  return multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, `./public/uploads/${folderName}`);
    },
    filename: (req, file, cb) => {
      const originalname = file.originalname;
      const filename = `${originalname.replace(/\s+/g, "").toLowerCase()}`;
      cb(null, filename);
    },
  });
}

const upload = (folderName: string) =>
  multer({
    storage: fileStorage(folderName),
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 },
  });

const uploadFile = (folderName: string) =>
  multer({
    storage: fileStorage(folderName),
    fileFilter: fileFilterPdf,
    limits: { fileSize: 5 * 1024 * 1024 },
  });

uploadRouter.post(
  "/banners",
  upload("banners").single("image"),
  uploadController.uploadFile
);

// user documents
uploadRouter.post(
  "/user-docs",
  upload("user-docs").single("image"),
  uploadController.uploadFile
);

uploadRouter.post(
  "/user-docs/id-card",
  uploadFile("user-docs").single("idCard"),
  uploadController.uploadFile
);
uploadRouter.post(
  "/user-docs/license",
  uploadFile("user-docs").single("license"),
  uploadController.uploadFile
);

uploadRouter.post(
  "/user-docs/diploma",
  uploadFile("user-docs").single("diploma"),
  uploadController.uploadFile
);
// end of user documents
uploadRouter.post(
  "/products",
  upload("products").single("imageUrl"),
  uploadController.uploadFile
);

uploadRouter.post(
  "/mails",
  upload("mails").single("attactment"),
  uploadController.uploadFile
);

uploadRouter.post(
  "/posts",
  upload("posts").single("imageUrl"),
  uploadController.uploadFile
);

uploadRouter.post(
  "/documents",
  upload("documents").single("image"),
  uploadController.uploadFile
);

uploadRouter.post(
  "/courses",
  upload("courses").single("courseImage"),
  uploadController.uploadFile
);

uploadRouter.post(
  "/stores",
  upload("stores").single("imageBannerUrl"),
  uploadController.uploadFile
);

export default uploadRouter;

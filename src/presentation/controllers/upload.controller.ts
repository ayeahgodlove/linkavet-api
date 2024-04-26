import { Request, Response } from "express";
export class UploadControllers {
  async uploadFile(req: Request, res: Response<any>): Promise<void> {
    const { filename } = req.file as Express.Multer.File;

    try {
      res.json({
        message: "File uploaded Successfully!",
        success: true,
        data: filename,
      });
    } catch (error: any) {
      res.status(400).json({
        message: error.message,
        success: false,
      });
    }
  }

  async uploadFiles(req: Request, res: Response<any>): Promise<void> {
    if (!req.files) {
      throw new Error("Please select images");
    }
    const { productImages } = req.files as any;

    const filenames = productImages.map((pi: any) => pi.filename);
    console.log("filenames: ", filenames)

    try {
      res.json({
        message: "Files uploaded Successfully!",
        success: true,
        data: filenames,
      });
    } catch (error: any) {
      res.status(400).json({
        message: error.message,
        success: false,
      });
    }
  }
}

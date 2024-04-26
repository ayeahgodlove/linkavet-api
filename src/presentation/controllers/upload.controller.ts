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
}

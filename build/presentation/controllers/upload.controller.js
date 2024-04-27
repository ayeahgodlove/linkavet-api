"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadControllers = void 0;
class UploadControllers {
    async uploadFile(req, res) {
        const { filename } = req.file;
        try {
            res.json({
                message: "File uploaded Successfully!",
                success: true,
                data: filename,
            });
        }
        catch (error) {
            res.status(400).json({
                message: error.message,
                success: false,
            });
        }
    }
    async uploadFiles(req, res) {
        if (!req.files) {
            throw new Error("Please select images");
        }
        const { productImages } = req.files;
        const filenames = productImages.map((pi) => pi.filename);
        console.log("filenames: ", filenames);
        try {
            res.json({
                message: "Files uploaded Successfully!",
                success: true,
                data: filenames,
            });
        }
        catch (error) {
            res.status(400).json({
                message: error.message,
                success: false,
            });
        }
    }
}
exports.UploadControllers = UploadControllers;

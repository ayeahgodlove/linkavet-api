"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFile = void 0;
const path_1 = __importDefault(require("path"));
const rimraf_1 = __importDefault(require("rimraf"));
function deleteFile(filename, folderName) {
    const baseDirectory = `./public/uploads/${folderName}`;
    const filePath = path_1.default.join(baseDirectory, filename);
    try {
        rimraf_1.default.sync(filePath);
        return true; // Deletion successful
    }
    catch (error) {
        console.error("Error deleting file:", error);
        return false; // Deletion failed
    }
}
exports.deleteFile = deleteFile;

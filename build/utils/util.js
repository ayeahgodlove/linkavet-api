"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateTotal = exports.calculateDiscountedPrice = exports.deleteFile = void 0;
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
function calculateDiscountedPrice(price, discountPercentage) {
    return (price * (100 - discountPercentage)) / 100;
}
exports.calculateDiscountedPrice = calculateDiscountedPrice;
// Function to calculate total based on discounted price and quantity
function calculateTotal(discountedPrice, quantity) {
    return discountedPrice * quantity;
}
exports.calculateTotal = calculateTotal;

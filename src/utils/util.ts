import path from "path";
import rimraf from "rimraf";

export function deleteFile(filename: string, folderName: string) {
  const baseDirectory = `./public/uploads/${folderName}`;
  const filePath = path.join(baseDirectory, filename);

  try {
    rimraf.sync(filePath);
    return true; // Deletion successful
  } catch (error) {
    console.error("Error deleting file:", error);
    return false; // Deletion failed
  }
}

export function calculateDiscountedPrice(
  price: number,
  discountPercentage: number
): number {
  return (price * (100 - discountPercentage)) / 100
}

// Function to calculate total based on discounted price and quantity
export function calculateTotal(discountedPrice: number, quantity: number): number {
  return discountedPrice * quantity;
}

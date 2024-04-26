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

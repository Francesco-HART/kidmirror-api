import * as fs from "fs";
import * as path from "path";
import { ImageRepository } from "../application/image.repository";
import { IdProvider } from "../application/id.provider";

export class LocalImageRepository implements ImageRepository {
  constructor(private readonly folderPath: string) {}

  async save(id: string, imagePath: string): Promise<void> {
    await this.createRootFolder();
    await this.createStudentFolder(id);

    const imageCount = this.getStudentImagesCount(id);

    await fs.promises.copyFile(
      imagePath,
      path.join(this.getStudentFolderPath(id), `${imageCount}.png`)
    );
  }

  private getStudentImagesCount(id: string) {
    const studentFolderPath = this.getStudentFolderPath(id);
    if (!fs.existsSync(studentFolderPath)) return -1;
    return fs.readdirSync(studentFolderPath).length;
  }

  private getStudentFolderPath(id: string) {
    return path.join(this.folderPath, id);
  }

  private async createStudentFolder(id: string) {
    const studentFolderPath = this.getStudentFolderPath(id);
    if (!fs.existsSync(studentFolderPath))
      await fs.promises.mkdir(studentFolderPath);
  }

  private async createRootFolder() {
    if (!fs.existsSync(this.folderPath))
      await fs.promises.mkdir(this.folderPath);
  }
}

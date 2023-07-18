import { ImageRepository } from "../application/image.repository";

export class InMemoryImageRepository implements ImageRepository {
  private images: Record<string, string[]> = {};

  async getAllOfStudent(studentId: string): Promise<string[]> {
    return this.images[studentId] || [];
  }

  async save(id: string, imagePath: string): Promise<void> {
    const studentId = id;
    if (!this.images[studentId]) {
      this.images[studentId] = [];
    }
    this.images[studentId].push(imagePath);
  }
}

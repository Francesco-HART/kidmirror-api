export abstract class ImageRepository {
  abstract save(id: string, imagePath: string): Promise<void>;
}

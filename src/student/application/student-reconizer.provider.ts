export abstract class StudentReconizerProvider {
  abstract reconizeByVideo(mp4FilePath: string): PromiseLike<string>;
  abstract reconize(imagePath: string): Promise<string>;
  abstract writeFolder(folderPath: string): Promise<void>;
}

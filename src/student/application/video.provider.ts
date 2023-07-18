export abstract class VideoProvider {
  abstract extractImages(videoPath: string): Promise<string[]>;
  abstract clearImages(): Promise<void>;
}

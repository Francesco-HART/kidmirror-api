import { VideoProvider } from "../application/video.provider";

export class VideoCutError extends Error {}

export class StubVideoProvider implements VideoProvider {
  images: string[];
  async extractImages(videoPath: string): Promise<string[]> {
    return Promise.resolve(this.images);
  }

  clearImages(): Promise<void> {
    this.images = [];
    return Promise.resolve();
  }
}

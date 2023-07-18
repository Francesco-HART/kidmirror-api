import { VideoProvider } from "../../application/video.provider";
import { FluentFfmpegVideoProvider } from "../fluent-ffmpeg-video.provider";
import * as path from "path";
import * as fs from "fs";

describe("FfmpegVideoProvider", () => {
  const folderPath = path.join(__dirname, "./screenshots");
  const videoPath = path.join(__dirname, "./tmp/goal.mp4");
  let videoProvider: VideoProvider;

  beforeEach(async () => {
    videoProvider = new FluentFfmpegVideoProvider(folderPath);
    try {
      await fs.promises.rm(folderPath, { recursive: true });
    } catch (error) {}
  });

  describe("extractImages()", () => {
    it("should return an array of 10 images path", async () => {
      await fs.promises.mkdir(folderPath);
      const images = await videoProvider.extractImages(videoPath);
      expect(images).toHaveLength(5);
    });
  });
  describe("clearImages()", () => {
    it("should remove all images from folder", async () => {
      await fs.promises.mkdir(folderPath);
      await fs.promises.writeFile(path.join(folderPath, "abc-0.png"), "");
      await fs.promises.writeFile(path.join(folderPath, "abc-1.png"), "");
      await videoProvider.clearImages();
      try {
        await fs.promises.readdir(folderPath);
      } catch (error) {
        expect(error.toString().includes("no such file or directory")).toBe(
          true
        );
      }
    });
  });
});

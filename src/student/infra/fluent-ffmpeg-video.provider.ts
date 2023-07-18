import { VideoProvider } from "../application/video.provider";
import ffmpeg from "fluent-ffmpeg";
import * as path from "path";
import * as fs from "fs";
import sharp from "sharp";

export class FluentFfmpegVideoProvider implements VideoProvider {
  constructor(private readonly folderPath: string) {}
  async extractImages(videoPath: string): Promise<string[]> {
    let images: string[] = [];

    this.clearImages();
    const proc = ffmpeg(videoPath);

    // await new Promise((resolve, reject) => {
    //   proc
    //     .outputOptions([
    //       "-vf unsharp=5:5:1.0:5:5:0.0", // Convertir en noir et blanc et améliorer la netteté
    //     ])
    //     .on("end", async () => {
    //       resolve({});
    //     })
    //     .on("error", async (error) => {
    //       reject(error);
    //     });
    // });

    proc.takeScreenshots(
      {
        count: 5,
      },
      this.folderPath
    );

    await new Promise((resolve) => {
      proc.on("end", async () => {
        images = await this.getImagesPathFromDir();
        resolve({});
      });
    });
    return images;
  }

  private async getImagesPathFromDir(): Promise<string[]> {
    let images: string[] = [];
    try {
      const readdir = await fs.promises.readdir(this.folderPath);
      images = readdir.map((file) => {
        let imagePath = path.join(this.folderPath, file);
        // return await this.saveFileInBlackAndWhite(imagePath);
        return imagePath;
      });
    } catch (error) {}

    return images;
  }

  async saveFileInBlackAndWhite(imagePath: string): Promise<string> {
    const outPutFilePath = path.join(this.folderPath, "output.jpeg");
    await sharp(imagePath)
      .grayscale() // Convertir en noir et blanc
      .toFile(outPutFilePath);
    // Supprimer le fichier d'origine
    // await fs.promises.unlink(imagePath);
    // console.log({
    //   imagePath,
    // });

    // Renommer le fichier de sortie avec le nom du fichier d'origine
    // await fs.promises.rename(outPutFilePath, imagePath);

    return imagePath;
  }

  async clearImages(): Promise<void> {
    try {
      await fs.promises.rm(this.folderPath, { recursive: true });
    } catch (error) {}
  }
}

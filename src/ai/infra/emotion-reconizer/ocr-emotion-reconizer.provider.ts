import Tesseract from "tesseract.js";
import { EmotionReconizerProvider } from "../../application/emotion-reconizer.provider";
import { Emotion } from "../../domain/emotion-reconized";
import sharp from "sharp";
import * as fs from "fs";
export class OcrEmotionReconizerProvider implements EmotionReconizerProvider {
  async reconize(imagePath: string): Promise<Emotion> {
    await sharp(imagePath)
      .resize(1000, 1000)
      .grayscale()
      .toFile(imagePath + ".jpeg");

    const emotion = await new Promise((resolve, reject) =>
      Tesseract.recognize(imagePath + ".jpeg", "eng", {})
        .then(({ data: { text } }) => {
          let emotion: Emotion = Emotion.NEUTRAL;
          if (text) {
            emotion = this.getMorePercentEmotion(text.toLowerCase().trim());
          }
          resolve(
            text
              ? this.getMorePercentEmotion(text.toLowerCase().trim())
              : emotion
          );
        })
        .catch((error) => {
          reject(error);
        })
    );
    await fs.promises.unlink(imagePath + ".jpeg");

    return emotion as Emotion;
  }

  private getMorePercentEmotion(ocrText: string): Emotion {
    const emotionPercent = ocrText
      .split("\n")
      .map((emotion) => {
        const emotionPercent = emotion
          .replace("(", "")
          .replace(")", "")
          .split(" ")

          .map((text) =>
            text
              .trim()
              .replace("%", "")
              .replace(":", "")
              .replace(";", "")
              .replace(",", "")
              .replace("‘", "")
          )
          .filter((text) => text !== "");
        return {
          emotion: emotionPercent[0],
          percent: parseFloat(emotionPercent[1]),
        };
      })
      .sort((a, b) => b.percent - a.percent);

    return emotionPercent[0].emotion as Emotion;
  }
}

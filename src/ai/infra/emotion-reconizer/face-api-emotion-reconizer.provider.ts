import { EmotionReconizerProvider } from "../../application/emotion-reconizer.provider";
import { Emotion } from "../../domain/emotion-reconized";
import { faceDetectionOptions } from "../load-models";
import * as faceapi from "face-api.js";

const canvas = require("canvas");

export class FaceApiEmotionReconizerProvider
  implements EmotionReconizerProvider
{
  async reconize(imagePath: string): Promise<Emotion> {
    const img = await canvas.loadImage(imagePath);

    const detectionWithExpressions = await faceapi
      .detectSingleFace(img, faceDetectionOptions)
      .withFaceExpressions();

    return detectionWithExpressions
      ? this.getMorepresentEmotion(detectionWithExpressions.expressions)
      : Emotion.NEUTRAL;
  }
  getMorepresentEmotion(expressionsDetected: {
    neutral: number;
    happy: number;
    sad: number;
    angry: number;
    fearful: number;
    disgusted: number;
    surprised: number;
  }): Emotion {
    const emotions = Object.keys(expressionsDetected);
    const morePresentEmotion = emotions.reduce(
      (prev, emotion) => {
        if (expressionsDetected[emotion] > prev.value) {
          return {
            emotion,
            value: expressionsDetected[emotion],
          };
        }
        return prev;
      },
      { emotion: emotions[0], value: 0 }
    );

    return morePresentEmotion.emotion as Emotion;
  }
}

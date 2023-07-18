import * as cv from "opencv4nodejs";
import { DetectInattentionProviderReturnValue } from "../../application/commands/detect-inattention.command";
import { InattentionDetectorProvider } from "../../application/inatention-detector.provider";

export class OpenCvInattentionDetectorProviderImpl
  implements InattentionDetectorProvider
{
  detectInattention(
    mp4FilePath: string
  ): Promise<DetectInattentionProviderReturnValue> {
    const videoCapture = new cv.VideoCapture(mp4FilePath);
    const faceClassifier = new cv.CascadeClassifier(cv.HAAR_FRONTALFACE_ALT2);
    const eyeClassifier = new cv.CascadeClassifier(cv.HAAR_EYE);

    let totalFrames = 0;
    let inattentionFrames = 0;
    let inattentionTime = 0;
    let detourneRegards = 1;
    let eyesDetected = true;
    let lastFrameTime = 0;

    return new Promise((resolve, reject) => {
      const detectGaze = () => {
        const frame = videoCapture.read();

        if (frame.empty) {
          const timePlayInMs = videoCapture.get(cv.CAP_PROP_POS_MSEC);
          const inattentionScore = inattentionFrames / totalFrames;
          const inattentionScorePercentage =
            this.calculatePercentage(inattentionScore);

          resolve({
            timePlayInMs,
            inattentionScore,
            inattentionTimeInMs: inattentionTime,
            inattentionScorePercentage,
            detourneRegards,
          });
          return;
        }

        const faces = faceClassifier.detectMultiScale(frame.bgrToGray());

        if (this.faceIsDetected(faces)) {
          const eyes = this.detectEyes(faces, frame, eyeClassifier);

          if (this.eyeIsNotDetected(eyes)) {
            inattentionFrames++;

            ({ eyesDetected, detourneRegards } = this.incrementRegardIsDeturned(
              eyesDetected,
              detourneRegards
            ));

            inattentionTime = this.incrementUnCaptedEyesDurationTime(
              lastFrameTime,
              videoCapture,
              inattentionTime
            );
          } else {
            eyesDetected = true;
          }
        }

        totalFrames++;
        lastFrameTime = videoCapture.get(cv.CAP_PROP_POS_MSEC);

        setImmediate(detectGaze);
      };

      detectGaze();
    });
  }

  private incrementUnCaptedEyesDurationTime(
    lastFrameTime: number,
    videoCapture: any,
    inattentionTime: number
  ) {
    if (lastFrameTime > 0) {
      const currentFrameTime = videoCapture.get(cv.CAP_PROP_POS_MSEC);
      const frameInterval = currentFrameTime - lastFrameTime;
      inattentionTime += frameInterval;
    }
    return inattentionTime;
  }

  private incrementRegardIsDeturned(
    eyesDetected: boolean,
    detourneRegards: number
  ) {
    if (eyesDetected) {
      detourneRegards++;
      eyesDetected = false;
    }
    return { eyesDetected, detourneRegards };
  }

  private detectEyes(faces: any, frame: any, eyeClassifier: any) {
    const faceRect = faces.objects[0];
    const faceRegion = frame.getRegion(faceRect);
    const eyes = eyeClassifier.detectMultiScale(faceRegion);
    return eyes;
  }

  private eyeIsNotDetected(eyes: any) {
    return eyes.objects.length === 0;
  }

  private faceIsDetected(faces: any) {
    return faces.objects.length === 1;
  }

  private calculatePercentage(inattentionScore: number) {
    return Math.floor(inattentionScore * 100);
  }
}

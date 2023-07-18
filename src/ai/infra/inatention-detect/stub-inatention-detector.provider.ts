import { InattentionDetectorProvider } from "../../application/inatention-detector.provider";

export class StubInattentionDetectorProvider
  implements InattentionDetectorProvider
{
  inattentionDetected: {
    timePlayInMs: number;
    inattentionScore: number;
    inattentionTimeInMs: number;
    inattentionScorePercentage: number;
    detourneRegards: number;
  } = {
    timePlayInMs: 0,
    inattentionScore: 0,
    inattentionTimeInMs: 0,
    inattentionScorePercentage: 0,
    detourneRegards: 0,
  };
  detectInattention(mp4FilePath: string): Promise<{
    timePlayInMs: number;
    inattentionScore: number;
    inattentionTimeInMs: number;
    inattentionScorePercentage: number;
    detourneRegards: number;
  }> {
    return Promise.resolve(this.inattentionDetected);
  }
}

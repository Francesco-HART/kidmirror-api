import { InattentionDetectorProvider } from "../../application/inatention-detector.provider";
import * as path from "path";
import { OpenCvInattentionDetectorProviderImpl } from "../inatention-detect/open-cv-inattention-detector.provider";

describe("Inattention Detector Integration Tests", () => {
  let openCvInatentionDetectorProviderImpl: InattentionDetectorProvider;

  const pathToElo2InattentionVideo = path.join(
    __dirname,
    "tmp/open-cv-inattention/elo-2-inattentions.mp4"
  );

  const pathToFrancesco3InattentionVideo = path.join(
    __dirname,
    "tmp/open-cv-inattention/francesco-3-inattentions.mp4"
  );
  beforeEach(() => {
    openCvInatentionDetectorProviderImpl =
      new OpenCvInattentionDetectorProviderImpl();
  });

  test("should detect inattention in a video file of 3 inattention", async () => {
    const mp4FilePath = pathToFrancesco3InattentionVideo;

    const result = await openCvInatentionDetectorProviderImpl.detectInattention(
      mp4FilePath
    );

    expect(result.timePlayInMs).toBeGreaterThan(12000);
    expect(result.timePlayInMs).toBeLessThan(14000);

    expect(result.inattentionTimeInMs).toBeGreaterThan(1200);
    expect(result.inattentionTimeInMs).toBeLessThan(2000);

    expect(result.inattentionScorePercentage).toBeGreaterThan(10);
    expect(result.inattentionScorePercentage).toBeLessThan(14);

    expect(result.detourneRegards).toEqual(3);
  }, 1000000);

  test("should detect inattention in a video file of 2 inattention", async () => {
    const mp4FilePath = pathToElo2InattentionVideo;

    const result = await openCvInatentionDetectorProviderImpl.detectInattention(
      mp4FilePath
    );

    expect(result.timePlayInMs).toBeGreaterThan(7000);
    expect(result.timePlayInMs).toBeLessThan(8000);

    expect(result.inattentionTimeInMs).toBeGreaterThan(2000);
    expect(result.inattentionTimeInMs).toBeLessThan(2500);

    expect(result.inattentionScorePercentage).toBeGreaterThan(30);
    expect(result.inattentionScorePercentage).toBeLessThan(35);

    expect(result.detourneRegards).toEqual(2);
  }, 1000000);
});

import * as path from "path";
import { Emotion } from "../../domain/emotion-reconized";
import { OcrEmotionReconizerProvider } from "../emotion-reconizer/ocr-emotion-reconizer.provider";

describe("OcrProvider", () => {
  let ocrProvider: OcrEmotionReconizerProvider;

  const happyImagePath = path.join(__dirname, "./tmp/ocr/happy.jpeg");
  const surprisedImagePath = path.join(__dirname, "./tmp/ocr/surprised.jpeg");
  const angryImagePath = path.join(__dirname, "./tmp/ocr/angry.jpeg");
  const happy68AndNeutral28 = path.join(
    __dirname,
    "./tmp/ocr/happy68AndNeutral28.jpeg"
  );
  const angry61AndDisgusted32 = path.join(
    __dirname,
    "./tmp/ocr/angry61AndDisgusted32.jpeg"
  );

  beforeEach(() => {
    ocrProvider = new OcrEmotionReconizerProvider();
  });

  it("should return happy when read happy emotion image", async () => {
    const emotion = await ocrProvider.reconize(happyImagePath);
    expect(emotion).toBe(Emotion.HAPPY);
  });

  it("should return angry when read angry emotion image", async () => {
    const emotion = await ocrProvider.reconize(angryImagePath);
    expect(emotion === Emotion.ANGRY).toBe(true);
  });

  it("should return agry when read angry 61% and Disgusted 32% on emotion image", async () => {
    const emotion = await ocrProvider.reconize(angry61AndDisgusted32);
    expect(emotion).toBe(Emotion.ANGRY);
  });

  it("should return agry when read happy 68% and Neutral 28% on emotion image", async () => {
    const emotion = await ocrProvider.reconize(happy68AndNeutral28);
    expect(emotion).toBe(Emotion.HAPPY);
  });

  it("should return agry when read surprised on emotion image", async () => {
    const emotion = await ocrProvider.reconize(surprisedImagePath);
    expect(emotion).toBe(Emotion.SURPRISED);
  });
});

// describe.only("Test get more % emotion", () => {
//   // angry (0.61)
//   // disgusted (0.32)
//   it("should return happy when read happy (1) emotion image", async () => {
//     expect(getMorePercentEmotion("happy (1)")).toBe(Emotion.HAPPY);
//   });

//   it("should return angry when read angry (0.87) emotion image", async () => {
//     expect(getMorePercentEmotion("angry (0.87)")).toBe(Emotion.ANGRY);
//   });
//   it("should return surpirsed when read surprised (0.61) and disgusted (0.32)  emotion image", async () => {
//     expect(getMorePercentEmotion("surprised (0.61) \n disgusted (0.32)")).toBe(
//       Emotion.SURPRISED
//     );
//   });

//   it("should return surpirsed when read hungry (0.50) and angry (0.50)  emotion image", async () => {
//     expect(getMorePercentEmotion("hungry (0.50) \n angry (0.50)")).toBe(
//       Emotion.HUNGRY || Emotion.ANGRY
//     );
//   });
//   it("should return surpirsed when read scared (0.52) and disgusted (0.24) and angry (0.24)  emotion image", async () => {
//     expect(
//       getMorePercentEmotion("scared (0.52) \n disgusted (0.24) \n angry (0.24)")
//     ).toBe(Emotion.SCARED);
//   });
//  });

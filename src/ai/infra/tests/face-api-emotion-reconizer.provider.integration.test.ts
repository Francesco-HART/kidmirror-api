import * as path from "path";
import { Emotion } from "../../domain/emotion-reconized";
import { loadModels } from "../load-models";
import { FaceApiEmotionReconizerProvider } from "../emotion-reconizer/face-api-emotion-reconizer.provider";

describe("FaceApiProvider", () => {
  let testExecuted: number = 0;
  let faceApiEmotionProvider: FaceApiEmotionReconizerProvider;
  const pathOfTestModels = path.join(__dirname, "./models");

  const happyImagePath = path.join(__dirname, "./tmp/face-api/happy.jpeg");
  const sadImagePath = path.join(__dirname, "./tmp/face-api/sad.jpeg");
  const angryImagePath = path.join(__dirname, "./tmp/face-api/angry.jpeg");
  const disgustedImagePath = path.join(
    __dirname,
    "./tmp/face-api/disgusted.jpeg"
  );
  const surprisedImagePath = path.join(
    __dirname,
    "./tmp/face-api/surprised.jpeg"
  );

  const rockImagePath = path.join(__dirname, "./tmp/face-api/rock.jpeg");

  beforeAll(async () => {
    await loadModels(pathOfTestModels);
  });

  beforeEach(function () {
    faceApiEmotionProvider = new FaceApiEmotionReconizerProvider();
    testExecuted++;
  });

  it("should return happy when is happy emotion image", async () => {
    const emotion = await faceApiEmotionProvider.reconize(happyImagePath);
    expect(emotion).toBe(Emotion.HAPPY);
  });

  it("should return sad when is sad emotion image", async () => {
    const emotion = await faceApiEmotionProvider.reconize(sadImagePath);
    expect(emotion).toBe(Emotion.SAD);
  });
  it("should return angry when is angry emotion image", async () => {
    const emotion = await faceApiEmotionProvider.reconize(angryImagePath);
    expect(emotion).toBe(Emotion.ANGRY);
  });

  it("should return disgusted when is disgusted emotion image", async () => {
    const emotion = await faceApiEmotionProvider.reconize(disgustedImagePath);
    expect(emotion).toBe(Emotion.DISGUSTED);
  });

  it("should return surprised when is surprised emotion image", async () => {
    const emotion = await faceApiEmotionProvider.reconize(surprisedImagePath);
    expect(emotion).toBe(Emotion.SURPRISED);
  });

  it("should return neutral when is not reconized emotion", async () => {
    const emotion = await faceApiEmotionProvider.reconize(rockImagePath);
    expect(emotion).toBe(Emotion.NEUTRAL);
  });
});

import { createStudentFixture } from "../../student/tests/student.fixture";
import {
  Emotion,
  NeutralIsNotAValidEmotionError,
} from "../domain/emotion-reconized";
import {
  ImitationGameFixture,
  createImitationGameFixture,
} from "./play-imitation-game.fixture";
import { EmotionFixture, creatEmotionFixture } from "./emotion.fixture";

describe("Feature : Play imitation reonize emotion game", () => {
  let fixture: ImitationGameFixture;
  let emotionReconizeFixture: EmotionFixture;

  beforeEach(() => {
    const studentFixture = createStudentFixture();

    emotionReconizeFixture = creatEmotionFixture({
      studentRepository: studentFixture.studentRepository,
      stubStudentReconizerProvider: studentFixture.stubStudentReconizerProvider,
    });

    fixture = createImitationGameFixture({
      emotionReconizerProvider: emotionReconizeFixture.emotionReconizerProvider,
    });
  });

  describe("Rule boolean is return if emotion reconize is same as emotion to reconize or not", () => {
    it("Billy emotion reconize is same as emotion to reconize", async () => {
      emotionReconizeFixture.givenEmotionIs(Emotion.HAPPY);

      await fixture.whenPlayImmitationGame(Emotion.HAPPY, "billy-happy.jpg");

      fixture.thenEmotionIsReconized();
    });

    it("Billy emotion reconize is not same as emotion to reconize", async () => {
      emotionReconizeFixture.givenEmotionIs(Emotion.HAPPY);

      await fixture.whenPlayImmitationGame(Emotion.SAD, "billy-happy.jpg");

      fixture.thenEmotionIsNotReconized();
    });
  });

  describe("Rule emotion to reconize can't be neutral", () => {
    it("Billy emotion reconize is not same as emotion to reconize", async () => {
      emotionReconizeFixture.givenEmotionIs(Emotion.HAPPY);

      await fixture.whenPlayImmitationGame(Emotion.NEUTRAL, "billy-happy.jpg");

      fixture.thenErrorShouldBe(NeutralIsNotAValidEmotionError);
    });
  });
});

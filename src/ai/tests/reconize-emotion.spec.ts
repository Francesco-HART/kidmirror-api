import { EmotionReconizeBuilder } from "./reconize-emotion.builder";
import { Student, StudentNotFoundError } from "../../student/domain/Student";
import { Emotion } from "../domain/emotion-reconized";
import {
  StudentFixture,
  createStudentFixture,
} from "../../student/tests/student.fixture";
import { StudentBuilder } from "../../student/tests/student.builder";
import { EmotionFixture, creatEmotionFixture } from "./emotion.fixture";

describe("Feature 1: Reconize emotion", () => {
  let studentFixture: StudentFixture;
  let fixture: EmotionFixture;

  beforeEach(() => {
    studentFixture = createStudentFixture();
    fixture = creatEmotionFixture({
      stubStudentReconizerProvider: studentFixture.stubStudentReconizerProvider,
      studentRepository: studentFixture.studentRepository,
    });
  });

  describe("Rule: When reconize emotion, emotion is same and associated to a student", () => {
    it(" Gimy is angry, the emotion return is angry and the reconized data is saved", async () => {
      const emotion = new EmotionReconizeBuilder()
        .withEmotion(Emotion.ANGRY)
        .withStudentId(fixture.gimy.id)
        .build();

      fixture.givenNowIs(emotion.createdAt);
      studentFixture.givenStudentReconizedIs(fixture.gimy);
      fixture.givenEmotionIs(Emotion.ANGRY);
      await fixture.whenReconizeEmotion("fake-image");
      fixture.thenEmotionReconizedIs(emotion);
    });

    it("Gimy is neutral, the emotion return is neutral and the reconized data is saved", async () => {
      const emotion = new EmotionReconizeBuilder()
        .withEmotion(Emotion.NEUTRAL)
        .withStudentId(fixture.gimy.id)
        .build();

      fixture.givenNowIs(emotion.createdAt);
      studentFixture.givenStudentReconizedIs(fixture.gimy);
      fixture.givenEmotionIs(Emotion.NEUTRAL);
      await fixture.whenReconizeEmotion("fake-image");
      fixture.thenEmotionReconizedIs(emotion);
    });

    it("Bob is neutral, the emotion return is neutral and the reconized data is saved", async () => {
      const emotion = new EmotionReconizeBuilder()
        .withEmotion(Emotion.ANGRY)
        .withStudentId(fixture.bob.id)
        .build();

      fixture.givenNowIs(emotion.createdAt);
      studentFixture.givenStudentReconizedIs(fixture.bob);
      fixture.givenEmotionIs(Emotion.ANGRY);
      await fixture.whenReconizeEmotion("fake-image");
      fixture.thenEmotionReconizedIs(emotion);
    });

    it("Emotion reconized is created at 2023-06-30", async () => {
      const emotion = new EmotionReconizeBuilder()
        .createdAt(new Date("2023-06-30"))
        .withStudentId(fixture.bob.id)
        .withEmotion(Emotion.ANGRY)
        .build();

      fixture.givenNowIs(new Date("2023-06-30"));
      studentFixture.givenStudentReconizedIs(fixture.bob);
      fixture.givenEmotionIs(Emotion.ANGRY);
      await fixture.whenReconizeEmotion("fake-image");
      fixture.thenEmotionReconizedIs(emotion);
    });

    it("Emotion reconized is created at 2023-06-30", async () => {
      const emotion = new EmotionReconizeBuilder()
        .createdAt(new Date("2023-06-30"))
        .withStudentId(fixture.bob.id)
        .withEmotion(Emotion.ANGRY)
        .build();

      fixture.givenNowIs(new Date("2023-06-30"));
      studentFixture.givenStudentReconizedIs(fixture.bob);
      fixture.givenEmotionIs(Emotion.ANGRY);
      await fixture.whenReconizeEmotion("fake-image");
      fixture.thenEmotionReconizedIs(emotion);
      fixture.thenEventEmittedIs("emotionReconized", emotion);
    });
  });

  describe("Rule: When reconize emotion, if student is not found return an error and emotion", () => {
    it("Should throw an error when student is not found", async () => {
      const emotion = new EmotionReconizeBuilder()
        .createdAt(new Date("2023-06-30"))
        .withEmotion(Emotion.ANGRY)
        .build();

      fixture.givenNowIs(new Date("2023-06-30"));
      studentFixture.givenStudentReconizedIs({
        student: { id: undefined },
      } as undefined as Student);
      fixture.givenEmotionIs(Emotion.ANGRY);
      await fixture.whenReconizeEmotion("fake-image");
      fixture.thenErrorShouldBe(StudentNotFoundError);
    });
  });

  describe("Rule:don't need to reconize student if studentId is given", () => {
    it("Should save a reconized emotion", async () => {
      let givenId = "1234";
      const student = new StudentBuilder().withId(givenId).build();
      const emotion = new EmotionReconizeBuilder()
        .createdAt(new Date("2023-06-30"))
        .withStudentId(givenId)
        .withEmotion(Emotion.ANGRY)
        .build();
      studentFixture.givenStudentExists([student]);
      fixture.givenNowIs(new Date("2023-06-30"));

      fixture.givenEmotionIs(Emotion.ANGRY);
      await fixture.whenReconizeEmotion("fake-image", givenId);
      fixture.thenEmotionReconizedIs(emotion);
      studentFixture.thenStudentReconizedIsNotCalled();
    });
  });

  describe("Rule: When reconize emotion, if emotion is not found return neutral", () => {
    it("Should throw an error when student is not found", async () => {
      const emotion = new EmotionReconizeBuilder()
        .createdAt(new Date("2023-06-30"))
        .withStudentId(fixture.bob.id)
        .withEmotion(Emotion.NEUTRAL)
        .build();

      fixture.givenNowIs(new Date("2023-06-30"));
      studentFixture.givenStudentReconizedIs(fixture.bob);
      fixture.givenEmotionIs(undefined);
      await fixture.whenReconizeEmotion("fake-image");
      fixture.thenEmotionReconizedIs(emotion);
    });
  });
});

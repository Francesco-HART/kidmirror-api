import { StudentNotFoundError } from "../../student/domain/Student";
import {
  StudentFixture,
  createStudentFixture,
} from "../../student/tests/student.fixture";
import { StudentBuilder } from "../../student/tests/student.builder";
import { EmotionFixture, creatEmotionFixture } from "./emotion.fixture";
import { InattentionDetectbuilder } from "./inattention-detect.builder";

describe("Detect inatention feature", () => {
  let fixture: EmotionFixture;
  let studentFixture: StudentFixture;
  beforeEach(() => {
    studentFixture = createStudentFixture();
    fixture = creatEmotionFixture({
      studentRepository: studentFixture.studentRepository,
      stubStudentReconizerProvider: studentFixture.stubStudentReconizerProvider,
    });
  });

  describe("Rule : save inatention score ", () => {
    test("Pablo joue au jeu des carte et et detourne le regard 2 fois", async () => {
      const student = new StudentBuilder().build();

      studentFixture.givenStudentReconizedIs(student);
      fixture.givenInattentionDetectedIs({
        timePlayInMs: 2000,
        inattentionScore: 2,
        inattentionTimeInMs: 0,
        inattentionScorePercentage: 0,
        detourneRegards: 0,
      });
      await fixture.whenDetectInattention("file.mp4");
      fixture.thenInattentionDetectShouldBe(
        new InattentionDetectbuilder()
          .withStudentId(student.id)
          .withInattentionScore(2)
          .withTimePlayInMs(2000)
          .build()
      );
    });
  });

  describe("Rule : une erreur est retourné si pablo n'est pas reconnu ", () => {
    test("Pablo joue au jeu des carte et et detourne le regard 2 fois", async () => {
      fixture.givenInattentionDetectedIs({
        timePlayInMs: 2000,
        inattentionScore: 2,
        inattentionTimeInMs: 0,
        inattentionScorePercentage: 0,
        detourneRegards: 0,
      });
      await fixture.whenDetectInattention("file.mp4");
      fixture.thenErrorShouldBe(StudentNotFoundError);
    });
  });

  describe("Rule:don't need to reconize student if studentId is given", () => {
    it("Should save a reconized emotion", async () => {
      let givenId = "1234";
      const student = new StudentBuilder().withId(givenId).build();

      studentFixture.givenStudentReconizedIs(student);
      studentFixture.givenStudentExists([student]);
      fixture.givenInattentionDetectedIs({
        timePlayInMs: 2000,
        inattentionScore: 2,
        inattentionTimeInMs: 0,
        inattentionScorePercentage: 0,
        detourneRegards: 0,
      });
      await fixture.whenDetectInattention("file.mp4", givenId);
      studentFixture.thenStudentReconizedIsNotCalled();
      fixture.thenInattentionDetectShouldBe(
        new InattentionDetectbuilder()
          .withStudentId(student.id)
          .withInattentionScore(2)
          .withTimePlayInMs(2000)
          .build()
      );
    });
  });
});

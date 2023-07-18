import { StudentReconizerProvider } from "../../student/application/student-reconizer.provider";
import { StubStudentReconizer } from "../../student/infra/stub-student-reconizer.provider";
import { StudentBuilder } from "../../student/tests/student.builder";
import {
  StudentFixture,
  createStudentFixture,
} from "../../student/tests/student.fixture";
import {
  AddEmotionDto,
  AddEmotionReconizedCommand,
} from "../application/commands/add-emotion.command";
import { EmotionFixture, creatEmotionFixture } from "./emotion.fixture";
import { EmotionReconizeBuilder } from "./reconize-emotion.builder";

describe("feature: AddEmotionCommand", () => {
  let fixture: EmotionFixture;
  let studentFixture: StudentFixture;
  beforeEach(() => {
    studentFixture = createStudentFixture();
    fixture = creatEmotionFixture({
      studentRepository: studentFixture.studentRepository,
      stubStudentReconizerProvider: studentFixture.stubStudentReconizerProvider,
    });
  });

  describe("Rule: save emotion", () => {
    it("Should save a reconized emotion", async () => {
      const student = new StudentBuilder().build();
      const givenDate = new Date("2021-09-01T00:00:00.000Z");
      const emotionReconized = new EmotionReconizeBuilder()
        .createdAt(givenDate)
        .withStudentId(student.id)
        .build();

      studentFixture.givenStudentExists([student]);
      fixture.givenNowIs(givenDate);
      fixture.whenAddEmotionReconized({
        studentId: student.id,
        emotion: emotionReconized.emotion,
      });
      fixture.thenEmotionReconizedIs(emotionReconized);
    });
  });
});

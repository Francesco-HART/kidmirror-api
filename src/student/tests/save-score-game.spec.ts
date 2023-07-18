import { StudentNotFoundError } from "../domain/Student";
import { StudentFixture, createStudentFixture } from "./student.fixture";
import {
  SaveScoreGameFixture,
  createSaveScoreGameFixture,
} from "./save-score-game.fixture";
import { ScoreBuilder } from "./score.builder";
import { StudentBuilder } from "./student.builder";

describe("Feature Save score game", () => {
  let fixture: SaveScoreGameFixture;
  let studentFixture: StudentFixture;

  beforeEach(() => {
    studentFixture = createStudentFixture();
    fixture = createSaveScoreGameFixture({
      studentRepository: studentFixture.studentRepository,
    });
  });

  describe("Rule : Score can be associated to a student and student id can be empy", () => {
    it("Billy play to immitation game and have 7/10 good answer in easy mode", async () => {
      const givenDateIs = new Date("2022-01-01T14:00:00.000Z");
      const student = new StudentBuilder().build();
      const score = new ScoreBuilder({
        studentId: student.id,
      })
        .withCreatedAt(givenDateIs)
        .withGoodAnswer(7)
        .build();

      studentFixture.givenStudentExists([student]);

      fixture.givenDateIs(givenDateIs);

      await fixture.whenAddScore({
        studentId: student.id,
        goodAnswer: score.goodAnswer,
        gameName: score.gameName,
        difficulty: score.difficulty,
      });

      fixture.thenScoreShouldBe(score);
    });

    it("Billy play to immitation game and have 7/10 good answer in easy mode and is automatically reconize", async () => {
      const givenDateIs = new Date("2022-01-01T14:00:00.000Z");
      const student = new StudentBuilder().build();
      const score = new ScoreBuilder({
        studentId: student.id,
      })
        .withCreatedAt(givenDateIs)
        .withGoodAnswer(7)
        .build();

      fixture.givenStudentReconizedIs(student);

      studentFixture.givenStudentExists([student]);

      fixture.givenDateIs(givenDateIs);

      await fixture.whenAddScore({
        goodAnswer: score.goodAnswer,
        gameName: score.gameName,
        difficulty: score.difficulty,
        imagePath: "path",
      });

      fixture.thenScoreShouldBe(score);
    });

    it("Billy can't save score because it is not reconized", async () => {
      const givenDateIs = new Date("2022-01-01T14:00:00.000Z");
      const student = new StudentBuilder().build();
      const score = new ScoreBuilder({
        studentId: student.id,
      })
        .withCreatedAt(givenDateIs)
        .withGoodAnswer(7)
        .build();

      studentFixture.givenStudentExists([student]);

      fixture.givenDateIs(givenDateIs);

      await fixture.whenAddScore({
        goodAnswer: score.goodAnswer,
        gameName: score.gameName,
        difficulty: score.difficulty,
        imagePath: "path",
      });

      fixture.thenErrorShouldBe(StudentNotFoundError);
    });
  });
});

import { StubDateProvider } from "../../ai/infra/stub-date.provider";
import { StubStudentReconizer } from "../infra/stub-student-reconizer.provider";
import {
  AddScoreCommand,
  AddScoreDTO,
} from "../application/commands/add-score.command";
import { StudentRepository } from "../application/student.repository";
import { Score } from "../domain/Score";
import { Student } from "../domain/Student";
import { InMemoryScoreRepository } from "../infra/in-memory-score.repository";
import { GetExistingStudentDomainService } from "../../ai/application/get-existing-student.domain-service";

export type SaveScoreGameFixture = ReturnType<
  typeof createSaveScoreGameFixture
>;

export const createSaveScoreGameFixture = ({
  studentRepository,
}: {
  studentRepository: StudentRepository;
}) => {
  let throwError: Error;
  const dateProvider = new StubDateProvider();
  const scoreRepository = new InMemoryScoreRepository();
  const studentReconizerProvider = new StubStudentReconizer();
  const getExistingStudentDomainService = new GetExistingStudentDomainService(
    studentRepository,
    studentReconizerProvider
  );
  const addScoreCommand = new AddScoreCommand(
    scoreRepository,
    studentRepository,
    dateProvider,
    getExistingStudentDomainService
  );

  return {
    givenDateIs(now: Date) {
      dateProvider.now = now;
    },
    givenStudentReconizedIs(student: Student) {
      studentReconizerProvider.studentId = student.id;
    },

    async whenAddScore(dto: AddScoreDTO) {
      try {
        await addScoreCommand.handle(dto);
      } catch (error) {
        throwError = error;
      }
    },

    thenScoreShouldBe(scoreExpected: Score) {
      const scores: Score[] = scoreRepository.getAll();
      expect(scores).toEqual(expect.arrayContaining([scoreExpected]));
    },

    thenErrorShouldBe(error: new () => Error) {
      expect(throwError).toBeInstanceOf(error);
    },
  };
};

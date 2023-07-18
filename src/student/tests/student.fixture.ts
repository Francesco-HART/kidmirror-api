import { AddStudentCommand } from "../application/commands/add-student.command";
import { Student } from "../domain/Student";
import { InMemoryImageRepository } from "../infra/in-memory-image.repository";
import { StubDateProvider } from "../../ai/infra/stub-date.provider";
import { StubUuidProvider } from "../infra/stub-id.provider";
import { InMemoryStudentRepository } from "../infra/in-memory-student.repository";
import { StubVideoProvider } from "../infra/stub-video.provider";
import { StubStudentReconizer } from "../infra/stub-student-reconizer.provider";

export type StudentFixture = ReturnType<typeof createStudentFixture>;

export const createStudentFixture = () => {
  let throwError: Error;
  const dateProvider = new StubDateProvider();
  const uuidProvider = new StubUuidProvider();
  const studentRepository = new InMemoryStudentRepository();
  const imageRepository = new InMemoryImageRepository();
  const stubVideoProvider = new StubVideoProvider();

  const stubStudentReconizerProvider = new StubStudentReconizer();

  const addStudentCommand = new AddStudentCommand(
    studentRepository,
    stubVideoProvider,
    imageRepository,
    uuidProvider
  );
  return {
    givenIdIs(id: string) {
      uuidProvider.id = id;
    },
    givenNowIs(now: Date) {
      dateProvider.now = now;
    },

    givenExtractedImagesIs(images: string[]) {
      stubVideoProvider.images = images;
    },
    givenStudentExists(students: Student[]) {
      studentRepository.addExistings(students);
    },

    givenStudentReconizedIs(student: Student) {
      stubStudentReconizerProvider.studentId = student.id;
    },

    async whenAddStudent(
      videoPath: string,
      dto: {
        firstname: string;
        lastname: string;
      }
    ) {
      try {
        await addStudentCommand.handle({
          videoPath,
          firstname: dto.firstname,
          lastname: dto.lastname,
        });
      } catch (error) {
        throwError = error;
      }
    },

    async thenStudentShouldBe(student: Student) {
      expect(studentRepository.getOne(student.id)).resolves.toEqual(student);
    },

    async thenStudentShouldBeUndefined() {
      expect(
        studentRepository.getOne(uuidProvider.id)
      ).resolves.toBeUndefined();
    },
    async thenStudentImagesShouldBe(images: string[]) {
      //TODO refacto
      const imagesGet = await imageRepository.getAllOfStudent(uuidProvider.id);
      expect(images.sort()).toEqual(imagesGet.sort());
    },
    thenStudentReconizedIsNotCalled() {
      jest.spyOn(stubStudentReconizerProvider, "reconize");
      expect(stubStudentReconizerProvider.reconize).not.toHaveBeenCalled();
    },

    thenErrorShouldBe(expectedError: new () => Error) {
      expect(throwError).toBeInstanceOf(expectedError);
    },
    studentRepository,
    stubStudentReconizerProvider,
  };
};

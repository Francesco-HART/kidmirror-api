import { EventEmitter2 } from "@nestjs/event-emitter";
import { ReconizeEmotionCommand } from "../application/commands/reconize-emotion.command";
import { ImageReconationService } from "../application/image-reconation.service";
import { Emotion, EmotionReconized } from "../domain/emotion-reconized";
import { Student } from "../../student/domain/Student";
import { StubDateProvider } from "../infra/stub-date.provider";
import { StubStudentReconizer } from "../../student/infra/stub-student-reconizer.provider";
import { StudentRepository } from "../../student/application/student.repository";
import { InattentionDetected } from "../domain/inatention-detected";
import { StubInattentionDetectorProvider } from "../infra/inatention-detect/stub-inatention-detector.provider";
import {
  DetectInattentionCommand,
  DetectInattentionProviderReturnValue,
} from "../application/commands/detect-inattention.command";
import { InMemoryEmotionReconizedRepository } from "../infra/emotion-reconizer/in-memory-emotion-reconize.repository";
import { InMemoryEmotionReconizerProvider } from "../infra/emotion-reconizer/stub-emotion-reconizer.provider";
import { InMemoryInattentionDetectorRepository } from "../infra/inatention-detect/in-memory-inatention-detected.repository";
import {
  AddEmotionDto,
  AddEmotionReconizedCommand,
} from "../application/commands/add-emotion.command";
import { GetExistingStudentDomainService } from "../application/get-existing-student.domain-service";

export type EmotionFixture = ReturnType<typeof creatEmotionFixture>;

export const creatEmotionFixture = ({
  studentRepository,
  stubStudentReconizerProvider,
}: {
  studentRepository: StudentRepository;
  stubStudentReconizerProvider: StubStudentReconizer;
}) => {
  let throwError: Error;
  const emotionReconizedRepository = new InMemoryEmotionReconizedRepository();
  const emotionReconizerProvider = new InMemoryEmotionReconizerProvider();
  const stubDateProvider = new StubDateProvider();
  const eventEmiterProvider = { emit: jest.fn() } as unknown as EventEmitter2;
  const inattentionDetectorProvider = new StubInattentionDetectorProvider();
  const inattentionDetectorRepository =
    new InMemoryInattentionDetectorRepository();

  const getExistingStudentDomainService = new GetExistingStudentDomainService(
    studentRepository,
    stubStudentReconizerProvider
  );

  const detectInattentionCommand = new DetectInattentionCommand(
    inattentionDetectorRepository,
    inattentionDetectorProvider,
    studentRepository,
    stubStudentReconizerProvider
  );
  const imageReconizeEmotionDomainService = new ImageReconationService(
    emotionReconizerProvider,
    stubStudentReconizerProvider,
    stubDateProvider
  );

  const reconizeEmotionCommand = new ReconizeEmotionCommand(
    emotionReconizedRepository,
    imageReconizeEmotionDomainService,
    getExistingStudentDomainService,
    eventEmiterProvider
  );

  const addEmotionReconizedCommand = new AddEmotionReconizedCommand(
    emotionReconizedRepository,
    stubDateProvider
  );
  const gimy: Student = { id: "abc", firstname: "Gimy", lastname: "Foo" };
  const bob: Student = { id: "def", firstname: "Bob", lastname: "24Inch" };

  return {
    gimy,
    bob,

    givenNowIs(now: Date) {
      stubDateProvider.now = now;
    },

    givenEmotionIs(emotion: Emotion) {
      emotionReconizerProvider.emotion = emotion;
    },

    givenTheFollowingEmotionsReconizedExists(emotions: EmotionReconized[]) {
      emotionReconizedRepository.addEmotions(emotions);
    },
    givenInattentionDetectedIs(
      inattentionDetected: DetectInattentionProviderReturnValue
    ) {
      inattentionDetectorProvider.inattentionDetected = inattentionDetected;
    },

    async whenReconizeEmotion(imagePath: string, studentId?: string) {
      try {
        await reconizeEmotionCommand.handle(imagePath, studentId);
      } catch (error) {
        throwError = error;
      }
    },
    async whenDetectInattention(videoPath: string, studentId?: string) {
      try {
        await detectInattentionCommand.execute(videoPath, studentId);
      } catch (error) {
        throwError = error;
      }
    },

    async whenAddEmotionReconized(dto: AddEmotionDto) {
      try {
        await addEmotionReconizedCommand.execute(dto);
      } catch (error) {
        throwError = error;
      }
    },

    thenInattentionDetectShouldBe(
      expectedInattentionDetected: InattentionDetected
    ) {
      const inattentionDetect: InattentionDetected =
        inattentionDetectorRepository.getFirstByStudentId(
          expectedInattentionDetected.studentId
        );
      expect(inattentionDetect).toEqual(expectedInattentionDetected);
    },

    thenEmotionReconizedIs(expectedEmotionReconized: EmotionReconized) {
      const emotions: EmotionReconized[] = emotionReconizedRepository.getAll();

      expect(emotions).toEqual(
        expect.arrayContaining([expectedEmotionReconized])
      );
    },

    thenEventEmittedIs(
      symbolName: string,
      expectedEmotionReconized: EmotionReconized
    ) {
      expect(eventEmiterProvider.emit).toBeCalledWith(symbolName, {
        emotionReconized: expectedEmotionReconized,
      });
    },

    thenErrorShouldBe(expectedError: new () => Error) {
      expect(throwError).toBeInstanceOf(expectedError);
    },

    emotionReconizerProvider,
  };
};

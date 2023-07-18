import { StudentRepository } from "../../../student/application/student.repository";
import { StudentNotFoundError } from "../../../student/domain/Student";
import { InattentionDetectedRepository } from "../inatention-detected.repository";
import { InattentionDetectorProvider } from "../inatention-detector.provider";
import { StudentReconizerProvider } from "../../../student/application/student-reconizer.provider";

export interface DetectInattentionProviderReturnValue {
  timePlayInMs: number;
  inattentionScore: number;
  inattentionTimeInMs: number;
  inattentionScorePercentage: number;
  detourneRegards: number;
}
export class DetectInattentionCommand {
  constructor(
    private readonly detectInattentionRepository: InattentionDetectedRepository,
    private readonly detectInattentionProvider: InattentionDetectorProvider,
    private readonly studentRepository: StudentRepository,
    private readonly reconizeStudentProvider: StudentReconizerProvider
  ) {}

  async execute(mp4FilePath: string, studentId?: string): Promise<void> {
    const inattentionDetect =
      await this.detectInattentionProvider.detectInattention(mp4FilePath);
    const studentReconizedId = studentId
      ? await this.getStudentId(studentId)
      : await this.reconizeStudentProvider.reconizeByVideo(mp4FilePath);

    if (!studentReconizedId) {
      throw new StudentNotFoundError();
    }

    await this.saveInattentionDetection(studentReconizedId, inattentionDetect);
  }

  private async getStudentId(studentId: string): Promise<string> {
    const student = await this.studentRepository.getOne(studentId);
    if (!student) {
      throw new StudentNotFoundError();
    }
    return student.id;
  }

  private async saveInattentionDetection(
    studentId: string,
    inattentionDetect: DetectInattentionProviderReturnValue
  ): Promise<void> {
    const {
      timePlayInMs,
      inattentionScore,
      inattentionTimeInMs,
      inattentionScorePercentage,
      detourneRegards,
    } = inattentionDetect;
    await this.detectInattentionRepository.save({
      studentId,
      timePlayInMs,
      inattentionScore,
      inattentionTimeInMs,
      detourneRegards,
      inattentionScorePercentage,
    });
  }
}

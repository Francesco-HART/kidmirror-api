import { InattentionDetectedRepository } from "../../application/inatention-detected.repository";
import { InattentionDetected } from "../../domain/inatention-detected";

export class InMemoryInattentionDetectorRepository
  implements InattentionDetectedRepository
{
  private inattentionDetected: InattentionDetected[] = [];

  async save(inattentionDetected: InattentionDetected): Promise<void> {
    this.inattentionDetected.push(inattentionDetected);
  }

  getFirstByStudentId(studentId: string): InattentionDetected {
    return this.inattentionDetected.find(
      (inattentionDetected) => inattentionDetected.studentId === studentId
    );
  }
}

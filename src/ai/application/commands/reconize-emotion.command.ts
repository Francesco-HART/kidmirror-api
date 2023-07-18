import { EventEmitter2 } from "@nestjs/event-emitter";
import { EmotionReconizeRepository } from "../emotion-reconize.repository";
import { ImageReconationService } from "../image-reconation.service";
import { EmotionReconized } from "../../domain/emotion-reconized";
import { GetExistingStudentDomainService } from "../get-existing-student.domain-service";

export class ReconizeEmotionCommand {
  constructor(
    private readonly emotionReconizeRepository: EmotionReconizeRepository,
    private readonly imageReconationService: ImageReconationService,
    private readonly getExistingStudentDomainService: GetExistingStudentDomainService,
    private readonly eventEmitterProvider: EventEmitter2
  ) {}

  async handle(path: string, studentId?: string): Promise<void> {
    let studentIdReconized = await this.getExistingStudentDomainService.execute(
      studentId,
      path
    );

    const emotion = this.setEmotion(
      await this.reconizeEmotion(path),
      studentIdReconized
    );
    await this.saveEmotion(emotion);
    this.emitEvent(emotion);
  }

  private setEmotion(
    emotionReconized: Omit<EmotionReconized, "studentId">,
    studentIdReconized: string
  ) {
    return {
      ...emotionReconized,
      studentId: studentIdReconized,
    };
  }

  private async saveEmotion(emotion: EmotionReconized): Promise<void> {
    await this.emotionReconizeRepository.add(emotion);
  }

  private async reconizeEmotion(
    path: string
  ): Promise<Omit<EmotionReconized, "studentId">> {
    return await this.imageReconationService.handle(path);
  }

  private emitEvent(emotionReconized: EmotionReconized): void {
    this.eventEmitterProvider.emit("emotionReconized", {
      emotionReconized,
    });
  }
}

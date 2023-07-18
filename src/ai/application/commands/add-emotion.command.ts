import { Emotion } from "../../domain/emotion-reconized";
import { DateProvider } from "../date.provider";
import { EmotionReconizeRepository } from "../emotion-reconize.repository";

export interface AddEmotionDto {
  studentId: string;
  emotion: Emotion;
}

export class AddEmotionReconizedCommand {
  constructor(
    private readonly emotionReconizedRepository: EmotionReconizeRepository,
    private readonly dateProvider: DateProvider
  ) {}

  async execute(dto: AddEmotionDto): Promise<void> {
    await this.emotionReconizedRepository.add({
      studentId: dto.studentId,
      emotion: dto.emotion,
      createdAt: this.dateProvider.getNow(),
    });
  }
}

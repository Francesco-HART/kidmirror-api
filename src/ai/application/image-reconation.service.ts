import { log } from "console";
import { Emotion, EmotionReconized } from "../domain/emotion-reconized";
import { StudentNotFoundError } from "../../student/domain/Student";
import { DateProvider } from "./date.provider";
import { EmotionReconizerProvider } from "./emotion-reconizer.provider";
import { StudentReconizerProvider } from "../../student/application/student-reconizer.provider";

export class ImageReconationService {
  constructor(
    private readonly emotionReconizerProvider: EmotionReconizerProvider,
    private readonly studentReconizerProvider: StudentReconizerProvider,
    private readonly dateProvider: DateProvider
  ) {}

  async handle(path: string): Promise<Omit<EmotionReconized, "studentId">> {
    let emotion = await this.emotionReconizerProvider.reconize(path);

    if (!emotion) emotion = Emotion.NEUTRAL;

    return {
      createdAt: this.dateProvider.getNow(),
      emotion: emotion,
    };
  }
}

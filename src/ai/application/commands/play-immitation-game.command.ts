import {
  Emotion,
  NeutralIsNotAValidEmotionError,
} from "../../domain/emotion-reconized";
import { EmotionReconizerProvider } from "../emotion-reconizer.provider";

export class PlayImmitationGameCommand {
  constructor(
    private readonly emotionReconizerProvider: EmotionReconizerProvider
  ) {}
  async execute(emotion: Emotion, imagePath: string): Promise<boolean> {
    if (emotion === Emotion.NEUTRAL) throw new NeutralIsNotAValidEmotionError();

    const emotionReconized = await this.emotionReconizerProvider.reconize(
      imagePath
    );

    return emotionReconized === emotion;
  }
}

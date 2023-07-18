import { EmotionReconizeRepository } from "../../application/emotion-reconize.repository";
import { EmotionReconized } from "../../domain/emotion-reconized";

export class InMemoryEmotionReconizedRepository
  implements EmotionReconizeRepository
{
  private emotions: EmotionReconized[] = [];

  add(emotion: EmotionReconized): Promise<void> {
    this.emotions.push(emotion);
    return Promise.resolve();
  }

  getAll(): EmotionReconized[] {
    return [...this.emotions];
  }

  async addEmotions(emotions: EmotionReconized[]) {
    emotions.forEach((emotion) => {
      this.emotions.push(emotion);
    });
  }
}

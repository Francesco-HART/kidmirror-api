import { EmotionReconizerProvider } from "../../application/emotion-reconizer.provider";
import { Emotion } from "../../domain/emotion-reconized";

export class InMemoryEmotionReconizerProvider
  implements EmotionReconizerProvider
{
  emotion: Emotion;
  reconize(imagePath: string): Promise<Emotion> {
    return Promise.resolve(this.emotion);
  }
}

import { Emotion } from "../domain/emotion-reconized";

export abstract class EmotionReconizerProvider {
  abstract reconize(imagePath: string): Promise<Emotion>;
}

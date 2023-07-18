import { EmotionReconized } from "../domain/emotion-reconized";

export abstract class EmotionReconizeRepository {
  abstract add(emotion: EmotionReconized): Promise<void>;
}

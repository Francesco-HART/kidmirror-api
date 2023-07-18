import { InattentionDetected } from "../domain/inatention-detected";

export type InattentionDetectedRepository = {
  save(inatentionDetected: InattentionDetected): Promise<void>;
};

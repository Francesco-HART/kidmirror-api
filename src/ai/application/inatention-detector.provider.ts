import { DetectInattentionProviderReturnValue } from "./commands/detect-inattention.command";

export type InattentionDetectorProvider = {
  detectInattention(
    mp4FilePath: string
  ): Promise<DetectInattentionProviderReturnValue>;
};

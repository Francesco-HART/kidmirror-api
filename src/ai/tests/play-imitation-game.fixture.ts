import { PlayImmitationGameCommand } from "../application/commands/play-immitation-game.command";
import { EmotionReconizerProvider } from "../application/emotion-reconizer.provider";
import { Emotion } from "../domain/emotion-reconized";

export type ImitationGameFixture = ReturnType<
  typeof createImitationGameFixture
>;

export const createImitationGameFixture = ({
  emotionReconizerProvider,
}: {
  emotionReconizerProvider: EmotionReconizerProvider;
}) => {
  let throwError: Error;
  let playImmitationGameResult: boolean;

  const playImmitationGameCommand = new PlayImmitationGameCommand(
    emotionReconizerProvider
  );

  return {
    async whenPlayImmitationGame(emotion: Emotion, imagePath: string) {
      try {
        playImmitationGameResult = await playImmitationGameCommand.execute(
          emotion,
          imagePath
        );
      } catch (error) {
        throwError = error;
      }
    },
    thenEmotionIsReconized() {
      expect(playImmitationGameResult).toBe(true);
    },
    thenEmotionIsNotReconized() {
      expect(playImmitationGameResult).toBe(false);
    },

    thenErrorShouldBe(error: new () => Error) {
      expect(throwError).toBeInstanceOf(error);
    },
  };
};

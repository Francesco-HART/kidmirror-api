import { Difficulty, GameName, Score } from "../domain/Score";

export class ScoreBuilder {
  private score: Score;
  constructor({ studentId }: { studentId: string }) {
    this.score = {
      studentId,
      goodAnswer: 0,
      gameName: GameName.IMMITATION,
      difficulty: Difficulty.EASY,
      createdAt: new Date("2023-06-29"),
    };
  }

  withGoodAnswer(goodAnswer: number): ScoreBuilder {
    this.score.goodAnswer = goodAnswer;
    return this;
  }

  withGameName(gameName: GameName): ScoreBuilder {
    this.score.gameName = gameName;
    return this;
  }

  withDifficulty(difficulty: Difficulty): ScoreBuilder {
    this.score.difficulty = difficulty;
    return this;
  }

  withCreatedAt(createdAt: Date): ScoreBuilder {
    this.score.createdAt = createdAt;
    return this;
  }

  build(): Score {
    return this.score;
  }
}

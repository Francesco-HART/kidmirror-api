export enum GameName {
  IMMITATION = "IMITATION",
}

export enum Difficulty {
  EASY = "easy",
  MEDIUM = "medium",
  HARD = "hard",
}

export class Score {
  studentId: string;
  goodAnswer: number;
  gameName: GameName;
  difficulty: Difficulty;
  createdAt: Date;
}

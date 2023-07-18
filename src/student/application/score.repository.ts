import { Score } from "../domain/Score";

export abstract class ScoreRepository {
  abstract save(score: Score): Promise<void>;
  abstract getAllOfStudent(studentId: string): Promise<Score[]>;
}

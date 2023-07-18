import { ScoreRepository } from "../application/score.repository";
import { Score } from "../domain/Score";

export class InMemoryScoreRepository implements ScoreRepository {
  scores: Score[] = [];

  async save(score: Score): Promise<void> {
    this.scores.push(score);
  }

  async getAllOfStudent(studentId: string): Promise<Score[]> {
    return this.scores.filter((score) => score.studentId === studentId);
  }

  getAll() {
    return [...this.scores];
  }
}

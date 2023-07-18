import { DateProvider } from "../../../ai/application/date.provider";
import { StudentReconizerProvider } from "../student-reconizer.provider";
import { Difficulty, GameName } from "../../domain/Score";
import { StudentNotFoundError } from "../../domain/Student";
import { ScoreRepository } from "../score.repository";
import { StudentRepository } from "../student.repository";
import { GetExistingStudentDomainService } from "../../../ai/application/get-existing-student.domain-service";

export type AddScoreDTO = {
  goodAnswer: number;
  gameName: GameName;
  difficulty: Difficulty;
  imagePath?: string;
  studentId?: string;
};

export class AddScoreCommand {
  constructor(
    private readonly scoreRepository: ScoreRepository,
    private readonly studentRepository: StudentRepository,
    private readonly dateProvider: DateProvider,
    private readonly getExistingStudentDomainService: GetExistingStudentDomainService
  ) {}

  async handle(dto: AddScoreDTO): Promise<void> {
    let studentId = await this.getExistingStudentDomainService.execute(
      dto.studentId,
      dto.imagePath
    );

    await this.isStudentExist(studentId);

    await this.saveScore(studentId, dto);
  }

  private async saveScore(studentId: string, dto: AddScoreDTO) {
    await this.scoreRepository.save({
      studentId: studentId,
      goodAnswer: dto.goodAnswer,
      difficulty: dto.difficulty,
      gameName: dto.gameName,
      createdAt: this.dateProvider.getNow(),
    });
  }

  private async isStudentExist(studentId: string) {
    const student = await this.studentRepository.getOne(studentId);
    if (!student) throw new StudentNotFoundError();
  }
}

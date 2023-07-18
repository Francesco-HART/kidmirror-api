import { StudentReconizerProvider } from "../../student/application/student-reconizer.provider";
import { StudentRepository } from "../../student/application/student.repository";
import { StudentNotFoundError } from "../../student/domain/Student";

export class GetExistingStudentDomainService {
  constructor(
    private readonly studentRepository: StudentRepository,
    private readonly studentReconizerProvider: StudentReconizerProvider
  ) {}
  async execute(studentId: string, path: string): Promise<string> {
    return studentId
      ? await this.verifyIfStudentExist(studentId)
      : await this.reconizeStudent(path);
  }

  private async verifyIfStudentExist(studentId: string): Promise<string> {
    if (await this.studentRepository.getOne(studentId)) return studentId;
    throw new StudentNotFoundError();
  }

  private async reconizeStudent(path: string): Promise<string> {
    const student = await this.studentReconizerProvider.reconize(path);
    if (!student) throw new StudentNotFoundError();
    return student;
  }
}

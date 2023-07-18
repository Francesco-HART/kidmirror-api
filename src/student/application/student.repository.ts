import { Student } from "../../student/domain/Student";

export abstract class StudentRepository {
  abstract save(student: Student): Promise<void>;
  abstract getOne(id: string): Promise<Student>;
  abstract getAll(): Promise<Student[]>;
}

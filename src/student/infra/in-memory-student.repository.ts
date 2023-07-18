import { StudentRepository } from "../application/student.repository";
import { Student } from "../domain/Student";
export class InMemoryStudentRepository implements StudentRepository {
  private students: Student[] = [];

  async save(student: Student): Promise<void> {
    this.add(student);
  }

  async getOne(id: string): Promise<Student> {
    return this.students.find((student) => student.id === id);
  }

  async getAll(): Promise<Student[]> {
    return this.students;
  }

  addExistings(students: Student[]) {
    this.students = students;
  }

  private add(student: Student) {
    this.students.push(student);
  }
}

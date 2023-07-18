import { StudentReconizerProvider } from "../../../student/application/student-reconizer.provider";
import { EventEmitter2 } from "@nestjs/event-emitter";
import * as path from "path";
import { StudentRepository } from "../../../student/application/student.repository";

export const EndSaveStudentEmitter = "endSaveStudent";
export class OnAddStudentSaveGetAiDescriptionCommand {
  constructor(
    public readonly studentReconizerProvider: StudentReconizerProvider,
    public readonly studentRepository: StudentRepository,
    private readonly eventEmitterProvider: EventEmitter2
  ) {}

  async execute(studentsFolder: string, studentId: string): Promise<void> {
    await this.studentReconizerProvider.writeFolder(
      path.join(studentsFolder, studentId)
    );
    const student = await this.studentRepository.getOne(studentId);
    this.eventEmitterProvider.emit(EndSaveStudentEmitter, {
      student,
    });
  }
}

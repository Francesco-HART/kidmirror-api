import { StudentReconizerProvider } from "../application/student-reconizer.provider";

export class StubStudentReconizer implements StudentReconizerProvider {
  writeFolder(folderPath: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  studentId: string;
  async reconize(imagePath: string): Promise<string> {
    return Promise.resolve(this.studentId);
  }

  async reconizeByVideo(mp4FilePath: string): Promise<string> {
    return Promise.resolve(this.studentId);
  }
}

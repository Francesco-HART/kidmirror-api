import { NotValidVideoFormatError } from "../../domain/Student";
import { VideoCutError } from "../../infra/stub-video.provider";
import { IdProvider } from "../id.provider";
import { ImageRepository } from "../image.repository";
import { StudentRepository } from "../student.repository";
import { VideoProvider } from "../video.provider";
import { Student } from "../../domain/Student";

export type AddStudentDto = {
  videoPath: string;
  firstname: string;
  lastname: string;
};

export class AddStudentCommand {
  constructor(
    private readonly studentRepository: StudentRepository,
    private readonly videoProvider: VideoProvider,
    private readonly imageRepository: ImageRepository,
    private readonly uuidProvider: IdProvider
  ) {}

  async handle(dto: AddStudentDto): Promise<void> {
    this.isMp4Format(dto.videoPath);

    const student: Student = {
      id: this.uuidProvider.generate(),
      firstname: dto.firstname,
      lastname: dto.lastname,
    };

    await this.saveAllImages(
      await this.getImagesFromMP4Video(dto.videoPath),
      student.id
    );
    await this.videoProvider.clearImages();

    await this.saveStudent(student);
  }

  private async saveStudent(student: Student) {
    await this.studentRepository.save(student);
  }

  private async saveAllImages(images: string[], studentId: string) {
    await Promise.all(
      images.map((imagesPath) =>
        // todo object to save (entity object)
        this.imageRepository.save(studentId, imagesPath)
      )
    );
  }

  private async getImagesFromMP4Video(videoPath: string) {
    const images = await this.videoProvider.extractImages(videoPath);
    if (!images || images.length === 0) throw new VideoCutError();

    return images;
  }

  private isMp4Format(videoPath: string): void {
    if (!videoPath.includes(".mp4")) throw new NotValidVideoFormatError();
  }
}

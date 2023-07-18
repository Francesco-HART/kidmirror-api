import * as faceapi from "face-api.js";
import { faceDetectionOptions } from "../load-models";
import * as fs from "fs";
import * as path from "path";
import { StudentReconizerProvider } from "../../../student/application/student-reconizer.provider";
const canvas = require("canvas");

export class FaceApiStudentReconizer implements StudentReconizerProvider {
  private readonly studentDataSourcePath: string;
  constructor(studentDataSourcePath: string) {
    this.studentDataSourcePath = studentDataSourcePath;
  }

  async writeFolder(folderPath): Promise<void> {
    const studentId = path.basename(folderPath);
    let studentDataToAdd = {};
    try {
      studentDataToAdd = JSON.parse(
        await fs.promises.readFile(this.studentDataSourcePath, "utf8")
      );
    } catch (error) {}

    const files = await fs.promises.readdir(folderPath);
    const labeledDescriptors = await Promise.all(
      files.map(async (file) => {
        const img = await canvas.loadImage(path.join(folderPath, file));
        const detectionWithStudentFace = await this.detectFace(img);

        return new faceapi.LabeledFaceDescriptors(folderPath, [
          detectionWithStudentFace.descriptor,
        ]);
      })
    );

    if (labeledDescriptors.length > 0)
      studentDataToAdd[studentId] = labeledDescriptors.map(
        (labeledDescriptor) => Object.values(labeledDescriptor.descriptors[0])
      );

    await fs.promises.writeFile(
      this.studentDataSourcePath,
      JSON.stringify(studentDataToAdd)
    );

    return Promise.resolve();
  }

  reconizeByVideo(mp4FilePath: string): PromiseLike<string> {
    throw new Error("Method not implemented.");
  }

  async reconize(imagePath: string): Promise<string> {
    const img = await canvas.loadImage(imagePath);

    const detectionWithStudentFace = await this.detectFace(img);

    // Charger les données de reconnaissance faciale enregistrées
    // this.writeDescriptionFace(detectionWithStudentFace.descriptor);
    // return "";

    const labeledDescriptors = await this.loadStudentFloat32Images();

    const faceMatcher =
      this.configureFaceReconizerWithStudentFloat32Images(labeledDescriptors);

    return this.findBestMatch(faceMatcher, detectionWithStudentFace).label;
  }

  private findBestMatch(
    faceMatcher: faceapi.FaceMatcher,
    detectionWithStudentFace: faceapi.WithFaceDescriptor<
      faceapi.WithFaceLandmarks<
        { detection: faceapi.FaceDetection },
        faceapi.FaceLandmarks68
      >
    >
  ) {
    return faceMatcher.findBestMatch(detectionWithStudentFace.descriptor);
  }

  private configureFaceReconizerWithStudentFloat32Images(
    labeledDescriptors: faceapi.LabeledFaceDescriptors[]
  ) {
    return new faceapi.FaceMatcher(labeledDescriptors);
  }

  private async loadStudentFloat32Images() {
    return await this.loadLabeledDescriptors();
  }

  private async detectFace(img: any) {
    return await faceapi
      .detectSingleFace(img, faceDetectionOptions)
      .withFaceLandmarks()
      .withFaceDescriptor();
  }

  async loadLabeledDescriptors() {
    // Charger les données de reconnaissance faciale enregistrées depuis un fichier JSON
    const data = await fs.promises.readFile(
      this.studentDataSourcePath,
      "utf-8"
    );
    const labeledDescriptors = JSON.parse(data);

    // Convertir les données en un format utilisable par face-api.js
    return Object.keys(labeledDescriptors).map((label) => {
      const descriptors = labeledDescriptors[label].map(
        (desc) => new Float32Array(desc)
      );
      return new faceapi.LabeledFaceDescriptors(label, descriptors);
    });
  }

  async writeDescriptionFace(faceDescription: Float32Array) {
    const objectToWrite = {
      "michael-id": [Object.values(faceDescription)],
    };
    await fs.promises.writeFile(
      this.studentDataSourcePath + "-test",
      JSON.stringify(objectToWrite)
    );
  }
}

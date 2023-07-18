import { StudentReconizerProvider } from "../../../student/application/student-reconizer.provider";
import * as path from "path";
import * as fs from "fs";
import { FaceApiStudentReconizer } from "../student-reconizer/face-api-student-reconizer.provider";
import { loadModels } from "../load-models";

describe("FaceApiStudentReconizer", () => {
  let testExecuted: number = 1;
  let faceApiStudentProvider: StudentReconizerProvider;

  let testWriteFloat32ImageFilePath: string = path.join(
    __dirname,
    "./tmp/face-api-reconizer/face-api-students.json"
  );

  const pathOfTestModels = path.join(__dirname, "./models");
  const studentDataSourcePath = path.join(
    __dirname,
    "./tmp/face-api-reconizer/descriptors.json"
  );

  const francescoImagePath = path.join(
    __dirname,
    "./tmp/face-api-reconizer/francesco-id/francesco.jpeg"
  );

  const robinImagePath = path.join(
    __dirname,
    "./tmp/face-api-reconizer/robin-id/robin.jpeg"
  );

  const robin2ImagePath = path.join(
    __dirname,
    "./tmp/face-api-reconizer/robin-id/robin-1.jpeg"
  );

  const michael1ImagePath = path.join(
    __dirname,
    "./tmp/face-api-reconizer/michael-id/michael.jpeg"
  );

  const michael2ImagePath = path.join(
    __dirname,
    "./tmp/face-api-reconizer/michael-id/michael-1.jpeg"
  );
  const michaelFolder = path.join(
    __dirname,
    "./tmp/face-api-reconizer/michael-id/"
  );

  const martinFolder = path.join(
    __dirname,
    "./tmp/face-api-reconizer/martin-id/"
  );

  const arthurFolder = path.join(
    __dirname,
    "./tmp/face-api-reconizer/arthur-id/"
  );

  beforeAll(async () => {
    await loadModels(pathOfTestModels);
    try {
      await fs.promises.writeFile(
        testWriteFloat32ImageFilePath,
        JSON.stringify({})
      );
    } catch (error) {}
  });

  beforeEach(async function () {
    faceApiStudentProvider = new FaceApiStudentReconizer(studentDataSourcePath);
    testExecuted++;
  });

  describe("reconize()", () => {
    test("Should detect Francesco", async () => {
      const studentId = await faceApiStudentProvider.reconize(
        francescoImagePath
      );
      expect(studentId).toBe("francesco-id");
    }, 120000);

    test("Should detect robin", async () => {
      const studentId = await faceApiStudentProvider.reconize(robinImagePath);
      expect(studentId).toBe("robin-id");
    }, 120000);

    test("Should detect robin 2", async () => {
      const studentId = await faceApiStudentProvider.reconize(robin2ImagePath);
      expect(studentId).toBe("robin-id");
    }, 120000);

    test("Should detect michael", async () => {
      const studentId = await faceApiStudentProvider.reconize(
        michael1ImagePath
      );
      expect(studentId).toBe("michael-id");
    }, 120000);

    test("Should detect michael 2", async () => {
      const studentId = await faceApiStudentProvider.reconize(
        michael2ImagePath
      );
      expect(studentId).toBe("michael-id");
    }, 120000);
  });

  describe("Verify if person is gay", () => {
    const _faceApiStudentProvider = new FaceApiStudentReconizer(
      testWriteFloat32ImageFilePath
    );

    test("Create float 32 array of a folder of images", async () => {
      await _faceApiStudentProvider.writeFolder(michaelFolder);

      let studentsFloat32Data = JSON.parse(
        await fs.promises.readFile(testWriteFloat32ImageFilePath, "utf8")
      );
      expect(studentsFloat32Data).toHaveProperty("michael-id");

      expect(studentsFloat32Data["michael-id"]).toHaveLength(2);
    }, 120000);

    test("Add float 32 array of a folder of images", async () => {
      await _faceApiStudentProvider.writeFolder(martinFolder);
      let studentsFloat32Data = JSON.parse(
        await fs.promises.readFile(testWriteFloat32ImageFilePath, "utf8")
      );
      expect(studentsFloat32Data).toHaveProperty("michael-id");
      expect(studentsFloat32Data).toHaveProperty("martin-id");

      expect(studentsFloat32Data["michael-id"]).toHaveLength(2);
      expect(studentsFloat32Data["martin-id"]).toHaveLength(2);
    }, 120000);

    test("Add float 32 array of a folder of images", async () => {
      await _faceApiStudentProvider.writeFolder(arthurFolder);
      let studentsFloat32Data = JSON.parse(
        await fs.promises.readFile(testWriteFloat32ImageFilePath, "utf8")
      );
      expect(studentsFloat32Data).toHaveProperty("michael-id");
      expect(studentsFloat32Data).toHaveProperty("martin-id");
      expect(studentsFloat32Data).toHaveProperty("arthur-id");

      expect(studentsFloat32Data["michael-id"]).toHaveLength(2);
      expect(studentsFloat32Data["martin-id"]).toHaveLength(2);
      expect(studentsFloat32Data["arthur-id"]).toHaveLength(2);
    }, 120000);
  });
});

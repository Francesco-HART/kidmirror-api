import { ImageRepository } from "../../application/image.repository";
import * as fs from "fs";
import * as path from "path";
import { LocalImageRepository } from "../local-image.repository";

describe("LocalImageRepository", () => {
  const imagesPath = path.join(__dirname, "./images");
  let imageRepository: ImageRepository;

  beforeEach(async () => {
    try {
      await fs.promises.rm(imagesPath, { recursive: true });
    } catch (error) {}
    imageRepository = new LocalImageRepository(imagesPath);
  });

  describe("save()", () => {
    it("should save first", async () => {
      await saveImageWithId("abc");
      expectImageExist("abc", "0.png");
    });

    it("should append to student images", async () => {
      await createImage("abc", "0.png");
      await saveImageWithId("abc");
      expectImagesToHaveLength("abc", 2);
    });

    it("should create folder for other studentId", async () => {
      await saveImageWithId("def");
      expectImageExist("def", "0.png");

      await saveImageWithId("abcd");
      expectImageExist("abcd", "0.png");
    });
  });

  function getImageFolderPath(folder: string) {
    return path.join(imagesPath, folder);
  }

  async function createImage(folder: string, imageName: string) {
    const imageFolderPath = getImageFolderPath(folder);

    try {
      await fs.promises.mkdir(imagesPath);
      await fs.promises.mkdir(imageFolderPath);
    } catch (e) {}

    return fs.promises.writeFile(path.join(imageFolderPath, imageName), "");
  }

  function expectImageExist(folder: string, imageName: string) {
    const imageFolderPath = getImageFolderPath(folder);
    expect(fs.existsSync(path.join(imageFolderPath, imageName))).toBe(true);
  }

  async function saveImageWithId(id: string) {
    await imageRepository.save(
      id,
      path.join(__dirname, "./tmp/first-image.png")
    );
  }

  async function expectImagesToHaveLength(folder: string, length: number) {
    expect(await fs.promises.readdir(getImageFolderPath(folder))).toHaveLength(
      length
    );
  }
});

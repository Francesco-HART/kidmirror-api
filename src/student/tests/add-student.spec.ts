import { NotValidVideoFormatError } from "../domain/Student";
import { VideoCutError } from "../infra/stub-video.provider";
import { StudentFixture, createStudentFixture } from "./student.fixture";
import { StudentBuilder } from "./student.builder";

describe("Feature add student", () => {
  let fixture: StudentFixture;

  beforeEach(() => {
    fixture = createStudentFixture();
  });

  describe("Rule Image file need to be MP4 format", () => {
    it("Should add an student ", async () => {
      const givenId = "123";

      const student = new StudentBuilder().withId(givenId).build();

      fixture.givenIdIs(givenId);

      fixture.givenExtractedImagesIs([
        "image1.jpg",
        "image2.jpg",
        "image2.jpg",
      ]);

      await fixture.whenAddStudent("video.mp4", {
        firstname: student.firstname,
        lastname: student.lastname,
      });

      await fixture.thenStudentShouldBe(student);
    });

    it("Should throw an error when video is not MP4 format", async () => {
      const givenId = "123";
      const student = new StudentBuilder().withId(givenId).build();

      fixture.givenIdIs("123");

      await fixture.whenAddStudent("video.avi", {
        firstname: student.firstname,
        lastname: student.lastname,
      });

      fixture.thenErrorShouldBe(NotValidVideoFormatError);
      await fixture.thenStudentShouldBeUndefined();
    });
  });

  describe("Rule: MP4 file is cute and return an array of image path to save", () => {
    it("array of image is associated to the new student", async () => {
      const givenId = "123";
      const student = new StudentBuilder().withId(givenId).build();

      fixture.givenIdIs("123");

      fixture.givenExtractedImagesIs([
        "image1.jpg",
        "image2.jpg",
        "image2.jpg",
      ]);

      await fixture.whenAddStudent("video.mp4", {
        firstname: student.firstname,
        lastname: student.lastname,
      });

      await fixture.thenStudentImagesShouldBe([
        "image1.jpg",
        "image2.jpg",
        "image2.jpg",
      ]);
    });
  });

  describe("Rule: Can't save student if video cut faild", () => {
    it("An error is return becose video cut is a fail", async () => {
      const givenId = "123";
      const student = new StudentBuilder().withId(givenId).build();

      fixture.givenIdIs("123");

      await fixture.whenAddStudent("video.mp4", {
        firstname: student.firstname,
        lastname: student.lastname,
      });

      fixture.thenErrorShouldBe(VideoCutError);

      await fixture.thenStudentImagesShouldBe([]);
    });
  });
});

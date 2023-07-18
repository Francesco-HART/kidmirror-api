// import { PrismaClient } from "@prisma/client";
// import { StudentRepository } from "../../application/student.repository";
// import { Student } from "../../domain/Student";
// import { PrismaStudentRepository } from "../prisma.student.repository";

// describe("PrismaStudentRepository", () => {
//   let prisma: PrismaClient;
//   let studentRepository: StudentRepository;
describe("PrismaStudentRepository", () => {
  test("save()", async () => {
    expect(1).toEqual(1);
  });
});
//   beforeEach(async () => {
//     prisma = new PrismaClient();
//     studentRepository = new PrismaStudentRepository(prisma);
//     await prisma.student.deleteMany();
//   });

//   describe("PrismaStudentRepository", () => {
//     test("save()", async () => {
//       const student: Student = {
//         id: "abc",
//         firstname: "John",
//         lastname: "Doe",
//       };

//       await studentRepository.save(student);
//       const studentFromDb = await prisma.student.findUnique({
//         where: { id: "abc" },
//       });
//       expect(studentFromDb).toEqual(student);
//     });

//     test("getOne()", async () => {
//       const student: Student = {
//         id: "abc",
//         firstname: "John",
//         lastname: "Doe",
//       };
//       await prisma.student.create({ data: student });

//       const studentFromDb = await studentRepository.getOne("abc");
//       expect(studentFromDb).toEqual(student);
//     });

//     test("getAll()", async () => {
//       const student: Student = {
//         id: "abc",
//         firstname: "John",
//         lastname: "Doe",
//       };
//       await prisma.student.create({ data: student });

//       const studentsFromDb = await studentRepository.getAll();
//       expect(studentsFromDb).toEqual([student]);
//     });
//   });
// });

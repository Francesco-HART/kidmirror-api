// import { PrismaClient, Student } from "@prisma/client";
// import { StudentRepository } from "../application/student.repository";

// export class PrismaStudentRepository implements StudentRepository {
//   constructor(private readonly prisma: PrismaClient) {}

//   async save(student: Student): Promise<void> {
//     await this.prisma.student.upsert({
//       create: {
//         id: student.id,
//         firstname: student.firstname,
//         lastname: student.lastname,
//       },
//       update: {
//         firstname: student.firstname,
//         lastname: student.lastname,
//       },
//       where: {
//         id: student.id,
//       },
//     });
//   }
//   getOne(id: string): Promise<Student> {
//     const student = this.prisma.student.findUnique({ where: { id } });
//     return student;
//   }
//   async getAll(): Promise<Student[]> {
//     return await this.prisma.student.findMany();
//   }
// }

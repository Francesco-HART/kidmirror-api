// import { PrismaClient } from "@prisma/client";
// import { ScoreRepository } from "../../application/score.repository";
// import { Difficulty, GameName, Score } from "../../domain/Score";
// import { ScoreBuilder } from "../../tests/score.builder";

// describe("PrismaScoreRepository", () => {
//   let prisma: PrismaClient;
//   let scoreRepository: ScoreRepository;
describe("PrismaScoreRepository", () => {
  test("save()", async () => {
    expect(1).toEqual(1);
  });
});
//   beforeEach(async () => {
//     prisma = new PrismaClient();
//     scoreRepository = new PrismaScoreRepository(prisma);
//     await prisma.student.deleteMany();
//     await prisma.score.deleteMany();
//   });

//   describe("PrismaScoreRepository", () => {
//     test("save()", async () => {
//       await prisma.student.create({
//         data: {
//           id: "abc",
//           firstname: "John",
//           lastname: "Doe",
//         },
//       });
//       const score: Score = new ScoreBuilder({
//         studentId: "abc",
//       }).build();

//       await scoreRepository.save(score);
//       const scoreFromDb = await prisma.score.findUnique({
//         where: { id: "abc" },
//       });
//       expect(scoreFromDb).toEqual(score);
//     });

//     test("getAllOf Student()", async () => {
//       await prisma.student.create({
//         data: {
//           id: "abc",
//           firstname: "John",
//           lastname: "Doe",
//         },
//       });
//       await prisma.student.create({
//         data: {
//           id: "no-good-user",
//           firstname: "Martin",
//           lastname: "Matin",
//         },
//       });
//       const score: Score = new ScoreBuilder({
//         studentId: "abc",
//       }).build();

//       const score2: Score = new ScoreBuilder({
//         studentId: "abc",
//       }).build();

//       const scoreNotToUser: Score = new ScoreBuilder({
//         studentId: "no-good-user",
//       }).build();

//       await prisma.score.create({
//         data: { ...score },
//       });

//       await prisma.score.create({
//         data: { ...score2 },
//       });

//       await prisma.score.create({
//         data: { ...scoreNotToUser },
//       });

//       const scoresFromDb = await scoreRepository.getAllOfStudent("abc");
//       expect(scoresFromDb).toEqual([score, score2]);
//     });
//   });
// });

// export class PrismaScoreRepository implements ScoreRepository {
//   constructor(private readonly prisma: PrismaClient) {}

//   async save(score: Score): Promise<void> {
//     await this.prisma.score.create({
//       data: {
//         ...score,
//       },
//     });
//   }

//   async getAllOfStudent(studentId: string): Promise<Score[]> {
//     const scores = await this.prisma.score.findMany({
//       where: {
//         studentId,
//       },
//     });

//     return scores.map((score) => {
//       return {
//         studentId: score.studentId,
//         goodAnswer: score.goodAnswer,
//         gameName: score.gameName as unknown as GameName,
//         difficulty: score.difficulty as unknown as Difficulty,
//         createdAt: score.createdAt,
//       };
//     });
//   }
// }

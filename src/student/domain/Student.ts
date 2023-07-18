export class NotValidVideoFormatError extends Error {}
export class StudentNotFoundError extends Error {}

export type Student = {
  id: string;
  firstname: string;
  lastname: string;
};

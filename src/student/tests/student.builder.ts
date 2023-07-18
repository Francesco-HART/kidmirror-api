import * as crypto from "crypto";
import { Student } from "../domain/Student";

export class StudentBuilder {
  private student: Student;

  constructor() {
    this.student = {
      id: crypto.randomUUID(),
      firstname: "Bob",
      lastname: "Bim",
    };
  }

  withId(id: string): StudentBuilder {
    this.student.id = id;
    return this;
  }

  withFirstname(firstname: string): StudentBuilder {
    this.student.firstname = firstname;
    return this;
  }

  withLastname(lastname: string): StudentBuilder {
    this.student.lastname = lastname;
    return this;
  }

  build(): Student {
    return this.student;
  }
}

import { InattentionDetected } from "../domain/inatention-detected";

export class InattentionDetectbuilder {
  inattentionDetesct: InattentionDetected = {
    timePlayInMs: 0,
    inattentionScore: 0,
    inattentionTimeInMs: 0,
    inattentionScorePercentage: 0,
    detourneRegards: 0,
    studentId: "",
  };

  withTimePlayInMs(timePlayInMs: number): InattentionDetectbuilder {
    this.inattentionDetesct.timePlayInMs = timePlayInMs;
    return this;
  }

  withInattentionScore(inatentionScore: number): InattentionDetectbuilder {
    this.inattentionDetesct.inattentionScore = inatentionScore;
    return this;
  }

  withInattentionTimeInMs(
    inatentionTimeInMs: number
  ): InattentionDetectbuilder {
    this.inattentionDetesct.inattentionTimeInMs = inatentionTimeInMs;
    return this;
  }

  withStudentId(studentId: string): InattentionDetectbuilder {
    this.inattentionDetesct.studentId = studentId;
    return this;
  }

  withInattentionScorePercentage(
    inatentionScorePercentage: number
  ): InattentionDetectbuilder {
    this.inattentionDetesct.inattentionScorePercentage =
      inatentionScorePercentage;
    return this;
  }

  withDetourneRegards(detourneRegards: number): InattentionDetectbuilder {
    this.inattentionDetesct.detourneRegards = detourneRegards;
    return this;
  }

  build(): InattentionDetected {
    return this.inattentionDetesct;
  }
}

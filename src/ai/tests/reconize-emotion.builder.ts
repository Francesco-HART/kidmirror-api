import { Emotion, EmotionReconized } from "../domain/emotion-reconized";

export class EmotionReconizeBuilder {
  private emotionReconize: EmotionReconized;
  constructor() {
    this.emotionReconize = {
      studentId: "any_student_id",
      emotion: Emotion.NEUTRAL,
      createdAt: new Date("2023-06-29"),
    };
  }

  withStudentId(studentId: string): EmotionReconizeBuilder {
    this.emotionReconize.studentId = studentId;
    return this;
  }

  withEmotion(emotion: Emotion): EmotionReconizeBuilder {
    this.emotionReconize.emotion = emotion;
    return this;
  }

  createdAt(createdAt: Date) {
    this.emotionReconize.createdAt = createdAt;
    return this;
  }

  build() {
    return this.emotionReconize;
  }
}

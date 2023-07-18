export class NeutralIsNotAValidEmotionError extends Error {}

export enum Emotion {
  HUNGRY = "hungry",
  ANGRY = "angry",
  HAPPY = "happy",
  SAD = "sad",
  SURPRISED = "surprised",
  DISGUSTED = "disgusted",
  SCARED = "scared",
  NEUTRAL = "neutral",
}

export type EmotionReconized = {
  studentId: string;
  emotion: Emotion;
  createdAt: Date;
};

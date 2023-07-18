import * as faceapi from "face-api.js";
import * as path from "path";

const canvas = require("canvas");
const { Canvas, Image, ImageData } = canvas;

const minConfidence = 0.5;
const faceDetectionNet = faceapi.nets.ssdMobilenetv1;

// TinyFaceDetectorOptions
export const inputSize = 408;
export const scoreThreshold = 0.5;

export const faceDetectionOptions = new faceapi.SsdMobilenetv1Options({
  minConfidence,
});

export async function loadModels(pathOfModels: string) {
  const modelToLoadPath = path.join(pathOfModels);
  faceapi.env.monkeyPatch({ Canvas, Image, ImageData });
  await faceDetectionNet.loadFromDisk(modelToLoadPath);
  await faceapi.nets.faceExpressionNet.loadFromDisk(modelToLoadPath);
  await faceapi.nets.faceLandmark68Net.loadFromDisk(modelToLoadPath);
  await faceapi.nets.faceRecognitionNet.loadFromDisk(modelToLoadPath);
}

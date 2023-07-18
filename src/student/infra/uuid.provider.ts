import { IdProvider } from "../application/id.provider";
import * as crypto from "crypto";

export class UuidProvider implements IdProvider {
  generate(): string {
    return crypto.randomUUID();
  }
}

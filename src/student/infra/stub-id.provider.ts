import { IdProvider } from "../application/id.provider";

export class StubUuidProvider implements IdProvider {
  id: string;
  generate(): string {
    return this.id;
  }
}

import { ForGettingStationsFromExternalService } from "../ports/driven/ForGettingStationsFromExternalService.ts";
export class Station {
  constructor(public readonly name: string) {}
  allStations(
    s: ForGettingStationsFromExternalService,
  ) {
    return s.getStations();
  }
}

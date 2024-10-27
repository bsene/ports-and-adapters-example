import { Station } from "../../app/station.ts";
import { ForGettingStationsFromExternalService } from "../../ports/driven/ForGettingStationsFromExternalService.ts";
export class FakeRFService implements ForGettingStationsFromExternalService {
  getStations(): Promise<Station[]> {
    return Promise.resolve([
      new Station("France Inter"),
      new Station("Mouv'"),
      new Station("France Info"),
      new Station("France Musique"),
      new Station("France Culture"),
      new Station("FIP"),
    ]);
  }
}

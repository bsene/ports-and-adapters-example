import { ForGettingStationsFromExternalService } from "../ports/driven/ForGettingStationsFromExternalService.ts";
import { ForGettingStations } from "../ports/driving/ForGettingStations.ts";
import { Station } from "./station.ts";

export class StationService implements ForGettingStations {
  allStations(
    service: ForGettingStationsFromExternalService,
  ): Promise<Station[]> {
    return service.getStations();
  }
}

import { ForGettingStationsFromExternalService } from "../driven/ForGettingStationsFromExternalService.ts";
import { Station } from "../../app/station.ts";

export interface ForGettingStations {
  allStations(
    service: ForGettingStationsFromExternalService,
  ): Promise<Station[]>;
}

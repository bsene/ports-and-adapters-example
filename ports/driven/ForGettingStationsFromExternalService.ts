import { Station } from "../../app/station.ts";
export interface ForGettingStationsFromExternalService {
  getStations(): Promise<Station[]>;
}

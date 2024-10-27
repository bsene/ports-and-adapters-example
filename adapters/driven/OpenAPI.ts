import { Station } from "../../app/station.ts";
import { ForGettingStationsFromExternalService } from "../../ports/driven/ForGettingStationsFromExternalService.ts";
import { z } from "https://deno.land/x/zod/mod.ts";

const stationItemSchema = z.object({
  title: z.string(),
});
const stationsSchema = z.array(stationItemSchema);
type StationData = z.infer<typeof stationItemSchema>;

const { BASE_URL } = Deno.env;

export class VoiceApi implements ForGettingStationsFromExternalService {
  async getStations(): Promise<Station[]> {
    const req = await fetch(
      "https://api.radiofrance.fr/voiceapi/public/stations",
    );
    const data = stationsSchema.parse(await req.json());

    const asStations = ({ title }: StationData): Station => new Station(title);

    return data.map(asStations);
  }
}

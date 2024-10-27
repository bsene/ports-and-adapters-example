import { Station } from "../../app/station.ts";
import { ForGettingStationsFromExternalService } from "../../ports/driven/ForGettingStationsFromExternalService.ts";
import { z } from "https://deno.land/x/zod/mod.ts";

const VOICEAPI_URL = Deno.env.get("VOICEAPI_ENDPOINT");
const stationDataSchema = z.object({
  title: z.string(),
});

const stationsResponse = z.array(stationDataSchema);

type StationData = z.infer<typeof stationDataSchema>;

export class VoiceApi implements ForGettingStationsFromExternalService {
  async getStations(): Promise<Station[]> {
    if (!VOICEAPI_URL) throw new Error("Missing BASE_UL env variable.");
    const req = await fetch(VOICEAPI_URL);
    const data = stationsResponse.parse(await req.json());

    const asStation = ({ title }: StationData): Station => new Station(title);

    return data.map(asStation);
  }
}

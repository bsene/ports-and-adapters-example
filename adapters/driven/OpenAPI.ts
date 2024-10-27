import { GraphQLClient } from "jsr:@avalero/graphql-client";
import { Station } from "../../app/station.ts";
import { ForGettingStationsFromExternalService } from "../../ports/driven/ForGettingStationsFromExternalService.ts";
import { z } from "https://deno.land/x/zod/mod.ts";

const stationItemSchema = z.object({
  title: z.string(),
});
const stationsSchema = z.array(stationItemSchema);
type StationData = z.infer<typeof stationItemSchema>;

const OPENAPI_URL = Deno.env.get("OPENAPI_ENDPOINT");
const ACCESS_TOKEN = Deno.env.get("ACCESS_TOKEN");

export class OpenApi implements ForGettingStationsFromExternalService {
  async getStations(): Promise<Station[]> {
    if (!OPENAPI_URL) throw new Error("Missing OPENAPI_ENDPOINT env variable.");
    if (!ACCESS_TOKEN) throw new Error("Missing ACCESS_TOKEN env variable.");
    const client = new GraphQLClient(OPENAPI_URL);

    const query = await client.query<{
      brands: {
        id: string;
        title: string;
        baseline: string;
        description: string;
        websiteUrl: string;
        playerUrl: string;
        liveStream: string;
      }[];
    }, undefined>(
      `query {
      brands {
        title
      }
    }`,
      {
        variables: undefined,
        headers: {
          "x-token": ACCESS_TOKEN,
        },
      },
    );

    const asStations = ({ title }: StationData): Station => new Station(title);

    return query.brands.map(asStations);
  }
}

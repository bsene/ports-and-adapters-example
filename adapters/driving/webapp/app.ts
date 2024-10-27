import { OpenApi } from "../../driven/OpenAPI.ts";
import { StationService } from "../../../app/station_service.ts";
const STATIONS_ROUTE = new URLPattern({ pathname: "/stations" });

async function handler(r: Request): Promise<Response> {
  const match = STATIONS_ROUTE.exec(r.url);

  if (!match) {
    return new Response("Not found.", { status: 404 });
  }

  return Response.json(await new StationService().allStations(new OpenApi()));
}

export function run() {
  Deno.serve(handler);
}

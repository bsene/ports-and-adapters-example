import { FakeRFService } from "../driven/FakeRFService.ts";
import { StationService } from "../../app/station_service.ts";
import { expect } from "jsr:@std/expect";
import { Station } from "../../app/station.ts";

Deno.test("Should NOT have radio france as a station", () => {
  const sut = new StationService();

  expect(sut.allStations(new FakeRFService())).not.toContain(
    new Station("Radio France"),
  );
});

Deno.test("Should have at least the 6 jor stations", async () => {
  const sut = (await new StationService().allStations(new FakeRFService())).map(
    (s) => s.name,
  );

  expect(sut).toContain(
    "France Inter",
  );
  expect(sut).toContain(
    "France Info",
  );
  expect(sut).toContain(
    "FIP",
  );
  expect(sut).toContain(
    "Mouv'",
  );
  expect(sut).toContain(
    "France Culture",
  );
  expect(sut).toContain(
    "France Musique",
  );
});

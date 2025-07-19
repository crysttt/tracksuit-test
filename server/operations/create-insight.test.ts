import { beforeAll, describe, it } from "jsr:@std/testing/bdd";
import { expect } from "jsr:@std/expect";
import { withDB } from "../testing.ts";
import type { Insight } from "$models/insight.ts";
import lookupInsight from "./lookup-insight.ts";
import createInsight from "./create-insight.ts";

describe("creating insights in the database", () => {
  describe("creating a new insight", () => {
    withDB((fixture) => {
      let result: Insight | undefined;

      beforeAll(() => {
        createInsight({
          ...fixture,
          brand: 0,
          text: "New Insight",
        });
      });

      it("returns the new insight", () => {
        result = lookupInsight({ ...fixture, id: 1 });
        expect(result).toBeDefined();
        expect(result).toEqual({
          id: 1,
          brand: 0,
          createdAt: expect.any(Date),
          text: "New Insight",
        });
      });
    });
  });
});

import { beforeAll, describe, it } from "jsr:@std/testing/bdd";
import { expect } from "jsr:@std/expect";
import { withDB } from "../testing.ts";
import type { Insight } from "$models/insight.ts";
import deleteInsight from "./delete-insight.ts";
import listInsights from "./list-insights.ts";

describe("deleting insights in the database", () => {
  describe("delete an insight", () => {
    withDB((fixture) => {
      const insights: Insight[] = [
        { id: 1, brand: 0, createdAt: new Date(), text: "1" },
        { id: 2, brand: 0, createdAt: new Date(), text: "2" },
        { id: 3, brand: 1, createdAt: new Date(), text: "3" },
        { id: 4, brand: 4, createdAt: new Date(), text: "4" },
      ];

      let result: Insight[];

      beforeAll(() => {
        fixture.insights.insert(
          insights.map((it) => ({
            ...it,
            createdAt: it.createdAt.toISOString(),
          })),
        );
        deleteInsight({ ...fixture, id: 1 });
        result = listInsights(fixture);
      });

      it("returns the expected insight", () => {
        expect(result).toEqual([
          { id: 2, brand: 0, createdAt: expect.any(Date), text: "2" },
          { id: 3, brand: 1, createdAt: expect.any(Date), text: "3" },
          { id: 4, brand: 4, createdAt: expect.any(Date), text: "4" },
        ]);
      });
    });
  });
});

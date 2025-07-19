import type { Insight } from "$models/insight.ts";
import type { HasDBClient } from "../shared.ts";
import * as insightsTable from "$tables/insights.ts";

type Input = HasDBClient & {
  brand: number;
  text: string;
};

export default (input: Input) => {
  const item = {
    brand: input.brand,
    text: input.text,
    createdAt: new Date().toISOString(),
  };

  input.db.exec(insightsTable.insertStatement(item));
  console.log("Successfully created insight", item);
  return;
};

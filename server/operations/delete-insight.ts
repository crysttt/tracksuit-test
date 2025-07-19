import type { HasDBClient } from "../shared.ts";
import * as insightsTable from "$tables/insights.ts";

type Input = HasDBClient & {
  id: number;
};

export default (input: Input) => {
  input.db.exec(insightsTable.deleteStatement(input.id));
  console.log("Successfully deleted insight", input.id);
  return;
};

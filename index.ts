import fetch from "node-fetch";
import { writeFileSync } from "fs";

interface USInputDay {
  date: Date;
  states: number;
  positive: number;
  negative: number;
  pending: number;
  hospitalizedCurrently: number;
  hospitalizedCumulative: number;
  inIcuCurrently: number;
  inIcuCumulative: number;
  onVentilatorCurrently: number;
  onVentilatorCumulative: number;
  recovered: number;
  dateChecked: Date;
  death: number;
  hospitalized: number;
  lastModified: Date;
  total: number;
  totalTestResults: number;
  posNeg: number;
  deathIncrease: number;
  hospitalizedIncrease: number;
  negativeIncrease: number;
  positiveIncrease: number;
  totalTestResultsIncrease: number;
  hash: string;
}

interface USOutputDay {
  x: Date;
  y: Omit<USInputDay, "date" | "dateChecked" | "lastModified" | "hash">;
}

(async () => {
  const response = await fetch(
    "https://api.covidtracking.com/v1/us/daily.json"
  );
  const json: USInputDay[] = await response.json();

  const output: USOutputDay[] = json.map(
    ({ date, dateChecked, lastModified, hash, ...theRest }) => ({
      x: date,
      y: theRest,
    })
  );

  writeFileSync("formatted.json", JSON.stringify(output));
})();

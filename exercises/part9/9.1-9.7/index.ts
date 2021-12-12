import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";
const app = express();
app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello fullstack");
});
app.get("/bmi", (req, res) => {
  const { height, weight } = req.query;
  try {
    const bmi = calculateBmi(Number(height), Number(weight));
    res.json({ height, weight, bmi });
  } catch (e) {
    res.json({ error: "malformatted parameters" });
  }
});
// eslint-disable-next-line @typescript-eslint/no-explicit-any
app.post("/exercises", (req: any, resp) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any

  const hours: Array<number> = req.body.hours;
  const target: number = req.body.target;
  try {
    const result = calculateExercises(hours, target);
    resp.json(result);
  } catch (e) {
    resp.json({ error: e.message });
  }
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log("Server listening on port " + PORT);
});

import express from "express";
import diagnosesRouter from "./routes/diagnoses";
import patientsRouter from "./routes/patients";
import cors from "cors";
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/patients", patientsRouter);
app.use("/api/diagnoses", diagnosesRouter);
app.get("/api/ping", (_req, res) => {
  console.log("someone pinged");
  res.send("pong");
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

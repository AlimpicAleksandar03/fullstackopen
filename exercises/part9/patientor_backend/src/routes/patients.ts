import express from "express";
import patientsService from "../services/patients";
import toPatientEntry from "../utils";
const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientsService.getPublicPatients());
});
router.post("/", (req, res) => {
  try {
    console.log(req.body);
    const newPatient = toPatientEntry(req.body);
    patientsService.newPatient(newPatient);

    res.json(newPatient);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    res.status(400).json(e.message);
  }
});
router.get("/:id", (req, res) => {
  try {
    const isExisting = patientsService.getSpecificPatient(req.params.id);
    res.json(isExisting);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    res.json({ error: e.message });
  }
});
export default router;

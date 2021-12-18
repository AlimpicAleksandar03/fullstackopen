import { PublicPatient } from "../types";
import patients from "../../data/patients";
import { Patient, NewPatientEntry } from "../types";
import { v1 as uuid } from "uuid";

const getPublicPatients = (): PublicPatient[] => {
  return patients.map(
    ({ id, name, dateOfBirth, occupation, gender, entries }) => {
      return { id, name, dateOfBirth, occupation, gender, entries };
    },
  );
};
const newPatient = (entry: NewPatientEntry): Patient => {
  const newPatientEntry = {
    ...entry,
    id: uuid(),
  };
  patients.push(newPatientEntry);
  return newPatientEntry;
};
const getSpecificPatient = (id: string): Patient | undefined => {
  const patient = patients.find((p) => Object.values(p).includes(id));
  if (!patient) {
    throw new Error("Cannot find patient with id " + id);
  }
  return patient;
};

export default { getPublicPatients, newPatient, getSpecificPatient };

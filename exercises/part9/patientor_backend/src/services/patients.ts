import { SsnExcluding } from "../types";
import patients from "../../data/patients";

const getSsnExcludingPatients = (): SsnExcluding[] => {
  return patients.map(({ id, name, dateOfBirth, occupation, gender }) => {
    return { id, name, dateOfBirth, occupation, gender };
  });
};

export default { getSsnExcludingPatients };

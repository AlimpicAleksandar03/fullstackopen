type Gender = "male" | "female";
export interface Diagnose {
  code: string;
  name: string;
  latin?: string;
}
export interface Patient {
  id: string;
  gender: Gender;
  dateOfBirth: string;
  name: string;
  occupation: string;
  ssn: string;
}
export type SsnExcluding = Omit<Patient, "ssn">;

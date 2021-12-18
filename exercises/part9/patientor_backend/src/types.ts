export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}
export interface Diagnose {
  code: string;
  name: string;
  latin?: string;
}
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry {}

export interface Patient {
  id: string;
  gender: Gender;
  dateOfBirth: string;
  name: string;
  occupation: string;
  ssn: string;
  entries: Entry[];
}
export type NewPatientEntry = Omit<Patient, "id">;
export type PublicPatient = Omit<Patient, "ssn">;

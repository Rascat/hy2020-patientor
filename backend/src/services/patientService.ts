import patientData from '../data/patients';
import { Patient, PublicPatient, NewPatient, Entry, NewEntry } from '../types';
import { v4 as uuid} from 'uuid';

const patients: Patient[] = patientData;

const getEntries = (): Array<Patient> => {
  return patients;
};

const getPublicEntries = (): Array<PublicPatient> => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const getPatientById = (id: string): Patient | undefined => {
  return patients.find(patient => patient.id === id);
};

const addPatient = (newPatient: NewPatient): Patient => {
  const patient = {
    id: uuid(),
    ...newPatient
  };

  patients.push(patient);
  return patient;
};

const addEntryToPatient = (id: string, newEntry: NewEntry): Entry => {
  const entry = {
    id: uuid(),
    ...newEntry,
  } as Entry;

  const patient = getPatientById(id);
  if (patient) {
    patient.entries.push(entry);
    return entry;

  } else {
    throw new Error(`No patient found with id: ${id}`);
  }
};

export default {
  getEntries,
  getPublicEntries,
  addPatient,
  getPatientById,
  addEntryToPatient
};
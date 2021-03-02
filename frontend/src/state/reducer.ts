import { State } from "./state";
import { Patient, PublicPatient, Diagnosis, Entry } from "../types";

export type Action =
  | {
    type: "SET_PATIENT_LIST";
    payload: PublicPatient[];
  }
  | {
    type: "ADD_PATIENT";
    payload: Patient;
  }
  | {
    type: "UPDATE_PATIENT";
    payload: Patient;
  }
  | {
    type: "SET_DIAGNOSES";
    payload: Diagnosis[];
  }
  | {
    type: "ADD_ENTRY";
    payload: { id: string; entry: Entry };
  };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      const patientsToSet = new Map<string, Patient | PublicPatient>();
      action.payload.forEach(p => patientsToSet.set(p.id, p));
      return {
        ...state,
        patients: patientsToSet
      };

    case "ADD_PATIENT":
      const newPatients = new Map<string, Patient | PublicPatient>(state.patients);
      newPatients.set(action.payload.id, action.payload);
      return {
        ...state,
        patients: newPatients
      };

    case "UPDATE_PATIENT":
      const patientsToUpdate = new Map<string, Patient | PublicPatient>(state.patients);
      patientsToUpdate.set(action.payload.id, action.payload);
      return {
        ...state,
        patients: patientsToUpdate
      };

    case "SET_DIAGNOSES":
      const diagnoses = new Map<string, Diagnosis>();
      action.payload.forEach(d => diagnoses.set(d.code, d));
      return {
        ...state,
        diagnoses
      };

    case "ADD_ENTRY":
      const patient = state.patients.get(action.payload.id) as Patient;
     
      patient.entries = [...patient.entries, action.payload.entry];
      const patients = new Map<string, Patient | PublicPatient>(state.patients);
      patients.set(action.payload.id, patient);
      return {
        ...state,
        patients
      };

    default:
      return state;
  }
};

export const setPatientList = (patients: Array<PublicPatient>): Action => {
  return {
    type: 'SET_PATIENT_LIST',
    payload: patients
  };
};

export const updatePatient = (patient: Patient): Action => {
  return {
    type: 'UPDATE_PATIENT',
    payload: patient
  };
};

export const addPatient = (patient: Patient): Action => {
  return {
    type: 'ADD_PATIENT',
    payload: patient
  };
};

export const setDiagnoses = (diagnoses: Diagnosis[]): Action => {
  return {
    type: 'SET_DIAGNOSES',
    payload: diagnoses
  };
};

export const addEntry = (id: string, entry: Entry): Action => {
  return {
    type: 'ADD_ENTRY',
    payload: { entry, id }
  };
};

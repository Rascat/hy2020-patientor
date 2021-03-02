/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  NewPatient,
  Gender,
  NewEntry,
  Diagnosis,
  HealthCheckRating,
  Discharge,
  SickLeave
} from './types';

const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isArray = (array: any): array is Array<any> => {
  return Array.isArray(array);
};

const isDiagnosisCodeArray = (array: any): array is Array<Diagnosis['code']> => {
  return isArray(array) && array.every(isString);
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isGender = (gender: any): gender is Gender => {
  return Object.values(Gender).includes(gender);
};

const isHealthCheckRating = (rating: any): rating is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(rating);
};

const parseName = (name: any): string => {
  if (!name || !isString(name)) {
    throw new Error(`Incorrect or missing name: ${name}`);
  }

  return name;
};

const parseDateOfBirth = (date: any): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error(`Incorrect or missing date: ${date}`);
  }

  return date;
};

const parseSSN = (ssn: any): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error(`Incorrect or missing ssn: ${ssn}`);
  }

  return ssn;
};

const parseGender = (gender: any): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error(`Incorrect or missing gender: ${gender}`);
  }

  return gender;
};

const parseOccupation = (occupation: any): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error(`Incorrect or missing occupation: ${occupation}`);
  }

  return occupation;
};

export const toNewPatient = (object: any): NewPatient => {
  const newPatient: NewPatient = {
    name: parseName(object.name),
    dateOfBirth: parseDateOfBirth(object.dateOfBirth),
    ssn: parseSSN(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseOccupation(object.occupation),
    entries: []
  };

  return newPatient;
};

const parseDescription = (description: any): string => {
  if (!description || !isString(description)) {
    throw new Error(`Incorrect or missing description: ${description}`);
  }

  return description;
};

const parseDate = (date: any): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error(`Incorrect or missing date: ${date}`);
  }

  return date;
};

const parseSpecialist = (specialist: any): string => {
  if (!specialist || !isString(specialist)) {
    throw new Error(`Incorrect or missing specialist: ${specialist}`);
  }

  return specialist;
};

const parseDiagnosisCodes = (codes: any): Array<Diagnosis['code']> => {
  if (!codes || !isDiagnosisCodeArray(codes)) {
    throw new Error(`Incorrect or missing diagnosis codes: ${codes}`);
  }

  return codes;
};

const isType = (type: any): type is 'HealthCheck' | 'OccupationalHealthcare' | 'Hospital' => {
  return type === 'HealthCheck'
    || type === 'OccupationalHealthcare'
    || type === 'Hospital';
};

const parseType = (type: any): 'HealthCheck' | 'OccupationalHealthcare' | 'Hospital' => {
  if (!type || !isString(type) || !isType(type)) {
    throw new Error(`Incorrect or missing type: ${type}`);
  }
  return type;
};

const parseHealthCheckRating = (rating: any): HealthCheckRating => {
  if (!rating || !isHealthCheckRating(rating)) {
    throw new Error(`Incorrect or missing rating: ${rating}`);
  }

  return rating;
};

const isDischarge = (discharge: any): discharge is Discharge => {
  return isString(discharge.date)
    && isDate(discharge.date)
    && isString(discharge.criteria);
};

const parseDischarge = (discharge: any): Discharge => {
  if (!discharge || !isDischarge(discharge)) {
    throw new Error(`Incorrect or missing discharge: ${discharge}`);
  }

  return discharge;
};

const isSickLeave = (leave: any): leave is SickLeave => {
  const validStartDate = isString(leave.startDate) && isDate(leave.startDate);
  const validEndDate = isString(leave.endDate) && isDate(leave.endDate);
  return validStartDate && validEndDate;
};

const parseSickLeave = (leave: any): SickLeave => {
  if (!leave || !isSickLeave(leave)) {
    throw new Error(`Incorrect or missing sick leave: ${leave}`);
  }

  return leave;
};

export const toNewEntry = (object: any): NewEntry => {
  const baseEntry = {
    description: parseDescription(object.description),
    date: parseDate(object.date),
    specialist: parseSpecialist(object.specialist),
    diagnosisCodes: object.diagnosisCodes
      ? parseDiagnosisCodes(object.diagnosisCodes)
      : undefined,
    type: parseType(object.type)
  };

  switch (baseEntry.type) {
    case 'HealthCheck': {
      const healthCheckEntry = {
        ...baseEntry,
        healthCheckRating: parseHealthCheckRating(object.healthCheckRating)
      };
      return healthCheckEntry;
    }
    case 'Hospital': {
      const hospitalEntry = {
        ...baseEntry,
        discharge: parseDischarge(object.discharge)
      };
      return hospitalEntry;
    }
    case 'OccupationalHealthcare': {
      const occupationalHealthcare = {
        ...baseEntry,
        employerName: parseName(object.employerName),
        sickLeave: object.sickLeave
          ? parseSickLeave(object.sickLeave)
          : undefined
      };
      return occupationalHealthcare;
    }
    default:
      throw new Error(`Could not parse entry: ${object}`);
  }
};
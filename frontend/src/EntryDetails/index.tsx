import React from 'react';
import HealthCheckEntryDetails from '../HealthCheckEntryDetails';
import HospitalEntryDetails from '../HospitalEntryDetails';
import OccupationalHealthcareEntryDetails from '../OccupationalHealthcareEntryDetails';
import { Entry, Diagnosis } from '../types';

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const EntryDetails: React.FC<{ entry: Entry; diagnoses: Map<string, Diagnosis> }> = ({ entry, diagnoses }) => {
  switch (entry.type) {
    case 'Hospital':
      return <HospitalEntryDetails entry={entry} diagnoses={diagnoses} />;
    case 'OccupationalHealthcare':
      return <OccupationalHealthcareEntryDetails entry={entry} diagnoses={diagnoses} />;
    case 'HealthCheck':
      return <HealthCheckEntryDetails entry={entry} diagnoses={diagnoses} />;
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;
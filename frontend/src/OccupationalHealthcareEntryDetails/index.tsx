import React from 'react';
import { Icon } from 'semantic-ui-react';
import { OccupationalHealthcareEntry, Diagnosis } from '../types';

const OccupationalHealthcareEntryDetails: React.FC<{ entry: OccupationalHealthcareEntry; diagnoses: Map<string, Diagnosis> }> = ({ entry, diagnoses }) => {
  const style = {
    border: '1px solid black',
    borderRadius: '10px',
    marginBottom: '5px',
    padding: '5px'
  };

  return (
    <div style={style}>
      <h3>{entry.date} <Icon name="doctor" /></h3>
      <em>{entry.description}</em>
      <div>specialist: {entry.specialist}</div>
      <div>employer: {entry.employerName}</div>
      {entry.sickLeave &&
        <div>
          <div>sick leave end date: {entry.sickLeave.endDate}</div>
          <div>sick leave start date: {entry.sickLeave.startDate}</div>
        </div>
      }
      
      <ul>
        {entry.diagnosisCodes?.map(c => (
          <li key={c}>{c} {diagnoses.get(c)?.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default OccupationalHealthcareEntryDetails;
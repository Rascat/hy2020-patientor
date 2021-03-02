import React from 'react';
import { Icon } from 'semantic-ui-react';
import { Diagnosis, HospitalEntry } from '../types';

const HospitalEntryDetails: React.FC<{ entry: HospitalEntry; diagnoses: Map<string, Diagnosis> }> = ({ entry, diagnoses }) => {
  const style = {
    border: '1px solid black',
    borderRadius: '10px',
    marginBottom: '5px',
    padding: '5px'
  };

  return (
    <div style={style}>
      <h3>{entry.date} <Icon name="hospital" /></h3>
      <em>{entry.description}</em>
      <div>specialist: {entry.specialist}</div>
      <div>discharge date: {entry.discharge.date}</div>
      <div>discharge criteria: {entry.discharge.criteria}</div>

      <ul>
        {entry.diagnosisCodes?.map(c => (
          <li key={c}>{c} {diagnoses.get(c)?.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default HospitalEntryDetails;
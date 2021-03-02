import React from 'react';
import { Icon } from 'semantic-ui-react';
import { HealthCheckEntry, Diagnosis } from '../types';

const HealthCheckEntryDetails: React.FC<{ entry: HealthCheckEntry; diagnoses: Map<string, Diagnosis> }> = ({ entry, diagnoses }) => {
  const style = {
    border: '1px solid black',
    borderRadius: '10px',
    marginBottom: '5px',
    padding: '5px'
  };
  return (
    <div style={style}>
      <h3>{entry.date} <Icon name="medkit" /></h3>
      <em>{entry.description}</em>
      <div>specialist: {entry.specialist}</div>
      <div>rating: {entry.healthCheckRating}</div>

      <ul>
        {entry.diagnosisCodes?.map(c => (
          <li key={c}>{c} {diagnoses.get(c)?.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default HealthCheckEntryDetails;
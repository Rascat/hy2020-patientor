import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Icon } from 'semantic-ui-react';
import { HospitalEntry, Patient } from '../types';
import { apiBaseUrl } from "../constants";
import { useStateValue, updatePatient, addEntry } from "../state";
import EntryDetails from '../EntryDetails';
import HealthCheckEntryForm, { EntryFormValues } from './EntryForm';


const PatientDetailPage: React.FC<{ id: string }> = ({ id }) => {
  const [{ patients, diagnoses }, dispatch] = useStateValue();
  const [patientToShow, setPatientToShow] = useState<Patient | null>(null);

  useEffect(() => {

    const updatePatientInState = async () => {
      try {
        const { data: patient } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );

        dispatch(updatePatient(patient));
      } catch (e) {
        console.error(e.response.data);
      }
    };

    const patient = patients.get(id);

    if (!patient) {
      return;
    }

    if (!('ssn' in patient) || !('entries' in patient)) {
      updatePatientInState();
    } else {
      setPatientToShow(patient);
    }
  }, [id, dispatch, patients]);

  const submitNewHospitalEntry = async (values: EntryFormValues) => {
    try {
    
      const { data: newEntry } = await axios.post<HospitalEntry>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      dispatch(addEntry(id, newEntry));
    } catch (e) {
      console.error(e.response.data);
    }
  };


  if (patientToShow) {
    return (
      <div>
        <h2>
          {patientToShow.name} {patientToShow.gender === 'male'
            ? <Icon name="mars" />
            : patientToShow.gender === 'female'
              ? <Icon name="venus" />
              : <Icon name="transgender alternate" />}
        </h2>
        <div>ssn: {patientToShow.ssn}</div>
        <div>occupation: {patientToShow.occupation}</div>
        <div>date of birth: {patientToShow.dateOfBirth}</div>
        <div>
          <h3>entries</h3>
          {patientToShow.entries.map(e => (
            <EntryDetails key={e.id} entry={e} diagnoses={diagnoses} />
          ))}
        </div>

        <HealthCheckEntryForm
          onSubmit={submitNewHospitalEntry}
          diagnoses={diagnoses}
        />
      </div>
    );

  } else {
    return <div>no patient</div>;
  }
};

export default PatientDetailPage;
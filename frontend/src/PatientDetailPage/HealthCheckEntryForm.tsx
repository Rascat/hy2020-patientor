import React from 'react';
import { Field, Formik, Form } from 'formik';
import { Diagnosis, HealthCheckRating } from '../types';
import { DiagnosisSelection, TextField, NumberField } from '../AddPatientModal/FormField';
import { Button, Form as UiForm } from 'semantic-ui-react';
import * as Yup from 'yup';

export interface EntryFormValues {
  type: 'HealthCheck' | 'OccupationalHealthcare' | 'Hospital';
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes: Array<Diagnosis['code']>;
  discharge: {
    date: string;
    criteria: string;
  };
  sickLeave: {
    startDate: string;
    endDate: string;
  };
  healthCheckRating: HealthCheckRating;
  employerName: string;
}



interface Props {
  onSubmit: (values: EntryFormValues) => void;
  diagnoses: Map<string, Diagnosis>;
}

const HealthCheckEntryForm: React.FC<Props> = ({ onSubmit, diagnoses }) => {

  const entrySchema = Yup.object().shape({
    type: Yup.string()
      .matches(/HealthCheck|OccupationalHealthcare|Hospital/g, 'Invalid type')
      .required('Field is required'),
    description: Yup.string()
      .min(2, 'Too Short!')
      .required('Field is required'),
    date: Yup.date().required('Field is required'),
    specialist: Yup.string()
      .min(5, 'Too short!')
      .required('Required!'),
    diagnosisCodes: Yup.array().of(Yup.string()),
    employerName: Yup.string().when('type', {
      is: 'OccupationalHealthcare',
      then: Yup.string().min(3, 'Name too short').required('Field is required')
    }),
    sickLeave: Yup.object({
      startDate: Yup.date().required('Field is missing'),
      endDate: Yup.date().required('Field is missing')
    }),
    discharge: Yup.object().when('type', {
      is: 'Hospital',
      then: Yup.object().shape({
        date: Yup.date().required('Field is required'),
        criteria: Yup.string().required('Field is required')
      }).required('Discharge data is required')
    })
  });

  return (
    <Formik onSubmit={onSubmit}
      initialValues={{
        type: 'HealthCheck',
        description: '',
        date: '',
        specialist: '',
        diagnosisCodes: [],
        healthCheckRating: HealthCheckRating.Healthy,
        employerName: '',
        sickLeave: {
          startDate: '',
          endDate: ''
        },
        discharge: {
          date: '',
          criteria: ''
        }
      }}
      validationSchema={entrySchema}
    >
      {({ values, dirty, isValid, setFieldValue, setFieldTouched, handleReset }) => {

        return (
          <Form className="form ui">
            <UiForm.Field>
              <label>type</label>
              <Field name="type" component="select" onChange={handleReset}>
                <option value="Hospital">Hospital</option>
                <option value="HealthCheck">HealthCheck</option>
                <option value="OccupationalHealthcare">OccupationalHealthcare</option>
              </Field>
            </UiForm.Field>
            <Field
              label="description"
              placeholder="description"
              name="description"
              component={TextField}
            />
            <Field
              label="date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="specialist"
              placeholder="specialist"
              name="specialist"
              component={TextField}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Array.from(diagnoses.values())}
            />
            {values.type === 'HealthCheck' && (
              <Field
                label="healthCheckRating"
                name="healthCheckRating"
                component={NumberField}
                min={0}
                max={3}
              />
            )}

            {values.type === 'OccupationalHealthcare' && (
              <div>
                <Field
                  label="employer name"
                  placeholder="employer name"
                  name="employerName"
                  component={TextField}
                />
                <Field
                  label="sick leave: start date"
                  placeholder="YYYY-MM-DD"
                  name="sickLeave.startDate"
                  component={TextField}
                />
                <Field
                  label="sick leave: end date"
                  placeholder="YYYY-MM-DD"
                  name="sickLeave.endDate"
                  component={TextField}
                />
              </div>
            )}

            {values.type === 'Hospital' && (
              <div>
                <Field
                  label="discharge date"
                  placeholder="YYYY-MM-DD"
                  name="discharge.date"
                  component={TextField}
                />
                <Field
                  label="discharge criteria"
                  placeholder="YYYY-MM-DD"
                  name="discharge.criteria"
                  component={TextField}
                />
              </div>
            )}

            <Button
              type="submit"
              color="green"
              disabled={!dirty || !isValid}>Add</Button>
          </Form>
        );
      }}

    </Formik>
  );
};

export default HealthCheckEntryForm;
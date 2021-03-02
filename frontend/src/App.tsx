import React, { useEffect } from "react";
import axios from "axios";
import { Route, Link, Switch, useRouteMatch } from "react-router-dom";
import { Button, Divider, Header, Container } from "semantic-ui-react";

import { apiBaseUrl } from "./constants";
import { useStateValue, setPatientList, setDiagnoses } from "./state";
import { Diagnosis, PublicPatient } from "./types";

import PatientListPage from "./PatientListPage";
import PatientDetailPage from './PatientDetailPage';

const App: React.FC = () => {
  const [, dispatch] = useStateValue();

  useEffect(() => {
    axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      try {
        const { data: patientListFromApi } = await axios.get<PublicPatient[]>(
          `${apiBaseUrl}/patients`
        );
        dispatch(setPatientList(patientListFromApi));
      } catch (e) {
        console.error(e);
      }
    };


    const fetchDiagnosisList = async () => {
      try {
        const { data: diagnosisListFromApi } = await axios.get<Diagnosis[]>(
          `${apiBaseUrl}/diagnoses`
        );
        dispatch(setDiagnoses(diagnosisListFromApi));
      } catch (e) {
        console.error(e);
      }
    };

    fetchPatientList();
    fetchDiagnosisList();
  }, [dispatch]);

  const match = useRouteMatch<{ id: string }>('/patients/:id');

  return (
    <div className="App">
      <Container>
        <Header as="h1">Patientor</Header>
        <Button as={Link} to="/" primary>
          Home
        </Button>
        <Divider hidden />
        <Switch>
          <Route path="/patients/:id" >
            {typeof (match?.params.id) === 'string'
              ? <PatientDetailPage id={match?.params.id} />
              : <div></div>
            }
          </Route>
          <Route path="/" render={() => <PatientListPage />} />
        </Switch>
      </Container>
    </div>
  );
};

export default App;

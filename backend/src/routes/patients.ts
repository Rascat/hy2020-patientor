import express from 'express';

import patientService from '../services/patientService';
import { toNewPatient, toNewEntry } from '../utils';

const router = express.Router();

router.post('/:id/entries', (req, res) => {
  try {
    const id =req.params.id;
    const newEntry = toNewEntry(req.body);
    const entry = patientService.addEntryToPatient(id, newEntry);
    res.json(entry);
  } catch (e) {
    if (e instanceof Error) {
      res.status(400).send(e.message);
    }
  }
});


router.get('/:id', (req, res) => {
  const id = req.params.id;
  const patient = patientService.getPatientById(id);
  if (patient) {
    res.json(patient);
  } else {
    res
      .status(404)
      .json({ error: `No patient found with id: ${id}` });
  }
});

router.get('/', (_req, res) => {
  res.json(patientService.getPublicEntries());
});

router.post('/', (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);
    const patient = patientService.addPatient(newPatient);
    res.json(patient);
  } catch (e) {
    if (e instanceof Error) {
      res.status(400).send(e.message);
    }
  }
});

export default router;
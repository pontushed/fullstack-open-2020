import express from 'express';
import patientService from '../services/patientService';
import toNewPatientEntry from '../utilities/toNewPatientEntry';
import toNewEntry from '../utilities/toNewEntry';

const router = express.Router();

router.get('/', (_req, res) => {
  const patients = patientService.getPatientsWithoutSsn();
  res.send(patients);
});

router.get('/:id', (req, res) => {
  const patient = patientService.getById(req.params.id);

  if (patient) {
    res.status(200).send(patient);
  } else {
    res.status(400).send();
  }
});

router.post('/', (req, res) => {
  try {
    const newPatient = toNewPatientEntry(req.body);
    const addedEntry = patientService.addEntry(newPatient);

    res.json(addedEntry);
  } catch (e) {
    res.status(400).send((e as Error).message);
  }
});

router.post('/:id/entries', (req, res) => {
  const id = req.params.id;
  const newEntry = toNewEntry(req.body);

  try {
    const addedEntry = patientService.addPatientEntry(id, newEntry);

    res.status(200).json(addedEntry);
  } catch (e) {
    res.status(400).send((e as Error).message);
  }
});

export default router;

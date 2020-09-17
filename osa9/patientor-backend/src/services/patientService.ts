import patients from '../../data/patients';
import { Patient, newPatientEntry, PublicPatient, Entry } from '../types';

const getPatientsWithoutSsn = (): PublicPatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const getById = (id: string): PublicPatient | undefined => {
  let patient = patients.find((p) => p.id === id);

  if (patient) {
    patient.entries.map((entry) => {
      switch (entry.type) {
        case 'HealthCheck':
          break;
        case 'Hospital':
          break;
        case 'OccupationalHealthcare':
          break;
        default:
          patient = undefined;
      }
    });
  }
  return patient;
};

const generateId = (): string => {
  const id = Math.floor(Math.random() * 999999999999999);
  return id.toString();
};

const addEntry = (entry: newPatientEntry): Patient => {
  const newPatient = {
    id: generateId(),
    ...entry,
  };

  patients.push(newPatient);
  return newPatient;
};

const addPatientEntry = (id: string, entry: Entry): Entry => {
  const patient = patients.find((p) => p.id === id);

  const newEntry = { ...entry };

  patient?.entries.concat(newEntry);

  return newEntry;
};

export default { getPatientsWithoutSsn, addEntry, getById, addPatientEntry };

import { useState } from 'react';
import { Patient } from '../types';
import { patients as initialPatients } from '../data/mockData';

export function usePatients() {
  const [patients, setPatients] = useState<Patient[]>(initialPatients);

  const addPatient = (patient: Patient) => {
    setPatients(prev => [...prev, patient]);
  };

  return {
    patients,
    addPatient
  };
}
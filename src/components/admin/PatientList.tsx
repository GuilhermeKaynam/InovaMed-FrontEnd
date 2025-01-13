import React, { useState } from 'react';
import { Search, ChevronDown } from 'lucide-react';
import { Patient } from '../../types';
import PatientCard from './PatientCard';
import PatientDetailsModal from './PatientDetailsModal';

interface PatientListProps {
  patients: Patient[];
}

export default function PatientList({ patients }: PatientListProps) {
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);

  const filteredPatients = patients.filter(patient => 
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.phone.includes(searchTerm)
  );

  return (
    <div className="space-y-4">
      {/* Search and filters */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Buscar paciente..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          />
        </div>
        
        <button
          onClick={() => setFilterOpen(!filterOpen)}
          className="mt-2 flex items-center text-sm text-gray-600 hover:text-gray-800"
        >
          <ChevronDown className={`w-4 h-4 mr-1 transform ${filterOpen ? 'rotate-180' : ''}`} />
          Filtros
        </button>
        
        {filterOpen && (
          <div className="mt-2 grid grid-cols-2 md:grid-cols-4 gap-2">
            <select className="rounded-md border-gray-300 text-sm">
              <option>Todos os convênios</option>
              <option>Unimed</option>
              <option>Particular</option>
            </select>
            <select className="rounded-md border-gray-300 text-sm">
              <option>Todos os médicos</option>
              <option>Dr. Carlos</option>
              <option>Dra. Ana</option>
            </select>
          </div>
        )}
      </div>

      {/* Patient list */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredPatients.map((patient) => (
          <PatientCard
            key={patient.id}
            patient={patient}
            onClick={() => setSelectedPatient(patient)}
          />
        ))}
      </div>

      {selectedPatient && (
        <PatientDetailsModal
          patient={selectedPatient}
          onClose={() => setSelectedPatient(null)}
        />
      )}
    </div>
  );
}
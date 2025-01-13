import React from 'react';
import { Calendar, Phone } from 'lucide-react';
import { Patient } from '../../types';
import { formatDateTime } from '../../utils/date';

interface PatientCardProps {
  patient: Patient;
  onClick: () => void;
}

export default function PatientCard({ patient, onClick }: PatientCardProps) {
  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow cursor-pointer"
    >
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-medium text-gray-900">{patient.name}</h3>
          <div className="flex items-center text-gray-600 text-sm mt-1">
            <Phone className="w-4 h-4 mr-1" />
            {patient.phone}
          </div>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          patient.insurance === 'Particular' 
            ? 'bg-purple-100 text-purple-800'
            : 'bg-green-100 text-green-800'
        }`}>
          {patient.insurance}
        </span>
      </div>

      <div className="flex items-center text-sm text-gray-600">
        <Calendar className="w-4 h-4 mr-1" />
        {formatDateTime(patient.appointmentDate)}
      </div>

      {patient.insurance === 'Particular' && (
        <div className="mt-2 text-sm">
          <div className="text-gray-600">{patient.paymentMethod}</div>
          <div className={`${
            patient.paymentStatus === 'Pago' ? 'text-green-600' : 'text-yellow-600'
          }`}>
            {patient.paymentStatus}
          </div>
        </div>
      )}
    </div>
  );
}
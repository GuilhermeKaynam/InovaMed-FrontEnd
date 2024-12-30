import React, { useState } from 'react';
import { X } from 'lucide-react';

interface DeleteAppointmentModalProps {
  onConfirm: (reason: string) => void;
  onCancel: () => void;
}

export default function DeleteAppointmentModal({ onConfirm, onCancel }: DeleteAppointmentModalProps) {
  const [reason, setReason] = useState('');

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Cancelar Consulta</h3>
            <button onClick={onCancel} className="text-gray-500 hover:text-gray-700">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Motivo do Cancelamento
            </label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              required
              rows={4}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
              placeholder="Digite o motivo do cancelamento..."
            />
          </div>

          <div className="flex justify-end gap-3">
            <button
              onClick={onCancel}
              className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
            >
              Cancelar
            </button>
            <button
              onClick={() => onConfirm(reason)}
              disabled={!reason}
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Confirmar Cancelamento
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
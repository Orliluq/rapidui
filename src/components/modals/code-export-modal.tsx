import React from 'react';
import { Button } from '@/components/ui/button';

interface CodeExportModalProps {
  open: boolean;
  onClose: () => void;
}

export function CodeExportModal({ open, onClose }: CodeExportModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white p-4 rounded-lg shadow-lg w-[90%] max-w-md">
        <h2 className="text-lg font-semibold mb-2">Exportar Código</h2>
        <p>Aquí irá la magia para exportar tu componente.</p>
        <Button className="mt-4" onClick={onClose}>
          Cerrar
        </Button>
      </div>
    </div>
  );
}
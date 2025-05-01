'use client'

import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useModal } from './use-modal';
import { CheckCircle, AlertCircle, AlertTriangle, Info } from 'lucide-react';
import { Button } from '../button';

export const Modal = () => {
  const { modal, closeModal } = useModal();

  const icons = {
    success: <CheckCircle className="h-6 w-6 text-green-500" />,
    error: <AlertCircle className="h-6 w-6 text-red-500" />,
    warning: <AlertTriangle className="h-6 w-6 text-yellow-500" />,
    info: <Info className="h-6 w-6 text-blue-500" />
  };

  return (
    <Dialog open={modal.isOpen} onOpenChange={closeModal}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center justify-center gap-3">
            {/* {icons[modal.type]} */}
            <DialogTitle className="title-4 text-center">{modal.title}</DialogTitle>
          </div>
          <DialogDescription className="text-4">{modal.description}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={closeModal} className="btn btn-primary">
            Continuar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
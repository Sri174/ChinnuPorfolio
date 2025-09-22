import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface CertificateModalProps {
  certification: { title: string; issuer: string };
  isOpen: boolean;
  onClose: () => void;
}

const CertificateModal: React.FC<CertificateModalProps> = ({ certification, isOpen, onClose }) => {
  if (!certification) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{certification.title}</DialogTitle>
        </DialogHeader>
        <p className="text-sm text-gray-500">
          Issuer: {certification.issuer}
        </p>
        {/* You can add an image of the certificate here if you have it */}
      </DialogContent>
    </Dialog>
  );
};

export default CertificateModal;

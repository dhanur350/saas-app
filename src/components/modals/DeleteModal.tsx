import Modal from '@/components/common/Modal';
import Button from '@/components/common/Button';
import type { Connection } from '@/utils/types';

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  connection: Connection | null;
  onConfirm: () => void;
}

function DeleteModal(props: DeleteModalProps) {
  const { isOpen, onClose, connection, onConfirm } = props;
  if (!connection) return null;

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Remove Connection" size="sm">
      <div className="space-y-4">
        <p className="text-gray-700">
          Are you sure you want to remove the connection <strong>{connection.name}</strong>?
        </p>
        <p className="text-sm text-gray-500">
          This action cannot be undone.
        </p>

        <div className="flex gap-3 justify-end mt-6">
          <Button variant="secondary" onClick={onClose}>
            Undo
          </Button>
          <Button variant="danger" onClick={handleConfirm}>
            Remove
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteModal;

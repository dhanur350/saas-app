import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faCheck } from '@fortawesome/free-solid-svg-icons';
import Modal from '@/components/common/Modal';
import Button from '@/components/common/Button';
import type { Connection } from '@/utils/types';

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  connection: Connection | null;
  onUpdate: () => void;
}

function EditModal(props: EditModalProps) {
  const { isOpen, onClose, connection, onUpdate } = props;
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (connection?.connectorUrl) {
      try {
        await navigator.clipboard.writeText(connection.connectorUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    }
  };

  const handleUpdate = () => {
    onUpdate();
    onClose();
  };

  if (!connection) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Change to Existing Connection" size="md">
      <div className="space-y-4">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800">
            You are about to update the connection settings. Review the details below before proceeding.
          </p>
        </div>

        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Integration</label>
            <p className="text-gray-900">{connection.integration}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <p className="text-gray-900">{connection.name}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Source</label>
            <p className="text-gray-900">{connection.source}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Entity/Group</label>
            <p className="text-gray-900">{connection.entityGroup}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Interval</label>
            <p className="text-gray-900">{connection.interval}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Connector URL</label>
            <div className="flex items-center gap-2">
              <code className="flex-1 bg-gray-100 px-3 py-2 rounded text-sm text-gray-800 break-all">
                {connection.connectorUrl}
              </code>
              <button
                onClick={handleCopy}
                className="px-3 py-2 bg-gray-200 hover:bg-gray-300 rounded transition-colors"
                title="Copy to clipboard"
              >
                <FontAwesomeIcon icon={copied ? faCheck : faCopy} className={copied ? 'text-green-600' : 'text-gray-600'} />
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Instructions</label>
            <p className="text-gray-900">{connection.instructions}</p>
          </div>
        </div>

        <div className="flex gap-3 justify-end mt-6">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Update
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default EditModal;

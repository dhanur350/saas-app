import React, { useState, useCallback } from 'react';
import ServiceCatalog from '@/components/integrations/ServiceCatalog';
import ConnectionsTable from '@/components/integrations/ConnectionsTable';
import EditModal from '@/components/modals/EditModal';
import DeleteModal from '@/components/modals/DeleteModal';
import { mockServices, mockConnections } from '@/utils/data/mockData';
import type { Connection } from '@/utils/types';

const Integrations: React.FC = () => {
  const [connections, setConnections] = useState<Connection[]>(mockConnections);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedConnection, setSelectedConnection] = useState<Connection | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);

  const itemsPerPage: number = 5;

  const handleEdit = (connection: Connection) => {
    setSelectedConnection(connection);
    setIsEditModalOpen(true);
  };

  const handleDelete = (connection: Connection) => {
    setSelectedConnection(connection);
    setIsDeleteModalOpen(true);
  };

  const handleUpdate = useCallback(() => {
    console.log('Update connection:', selectedConnection);
  }, [selectedConnection]);

  const handleDeleteConfirm = useCallback(() => {
    if (selectedConnection) {
      setConnections(prevConnections =>
        prevConnections.filter(conn => conn.id !== selectedConnection.id)
      );
      console.log('Deleted connection:', selectedConnection);
    }
    setIsDeleteModalOpen(false);
    setSelectedConnection(null);
  }, [selectedConnection]);

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedConnection(null);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedConnection(null);
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Integrations</h1>
        <p className="text-gray-600 mt-1">Manage your service integrations and connections</p>
      </div>

      <ServiceCatalog services={mockServices} />

      <ConnectionsTable
        connections={connections}
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        itemsPerPage={itemsPerPage}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <EditModal
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        connection={selectedConnection}
        onUpdate={handleUpdate}
      />

      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        connection={selectedConnection}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
};

export default Integrations;

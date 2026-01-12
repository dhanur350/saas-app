import { useMemo, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons';
import type { Connection } from '@/utils/types';
import SearchBar from '@/components/integrations/SearchBar';
import Pagination from '@/components/integrations/Pagination';
import { useDebounce } from '@/hooks/useDebounce';

interface ConnectionsTableProps {
  connections: Connection[];
  searchQuery: string;
  onSearchChange: (query: string) => void;
  currentPage: number;
  onPageChange: (page: number) => void;
  itemsPerPage: number;
  onEdit: (connection: Connection) => void;
  onDelete: (connection: Connection) => void;
}

const TABLE_HEADERS: string[] = [
  'Integration',
  'Name',
  'Source',
  'Entity/Group',
  'Interval',
  'Connector URL',
  'Instructions',
  'Actions',
];


function ConnectionsTable(props: ConnectionsTableProps) {
  const { connections, searchQuery, onSearchChange, currentPage, onPageChange, itemsPerPage, onEdit, onDelete } = props;
  const debouncedSearchQuery: string = useDebounce<string>(searchQuery, 300);

  const filteredConnections: Connection[] = useMemo(() => {
    if (!debouncedSearchQuery) return connections;

    const query: string = debouncedSearchQuery.toLowerCase();
    return connections.filter((conn: Connection) =>
      conn.integration.toLowerCase().includes(query) ||
      conn.name.toLowerCase().includes(query) ||
      conn.source.toLowerCase().includes(query) ||
      conn.entityGroup.toLowerCase().includes(query)
    );
  }, [connections, debouncedSearchQuery]);

  const totalPages = useMemo(() =>
    Math.ceil(filteredConnections.length / itemsPerPage),
    [filteredConnections.length, itemsPerPage]
  );
  const paginatedConnections: Connection[] = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredConnections.slice(startIndex, endIndex);
  }, [filteredConnections, currentPage, itemsPerPage]);

  const handleEdit = useCallback((connection: Connection) => {
    onEdit(connection);
  }, [onEdit]);

  const handleDelete = useCallback((connection: Connection) => {
    onDelete(connection);
  }, [onDelete]);

  const renderTableHeaders = (header: string) => (
    <th
      key={header}
      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
    >
      {header}
    </th>
  );

  const renderPaginatedConnections = (connection: Connection) => (
    <tr key={connection.id} className="hover:bg-gray-50 transition-colors">
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {connection.integration}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
        {connection.name}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
        {connection.source}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
        {connection.entityGroup}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
        {connection.interval}
      </td>
      <td className="px-6 py-4 text-sm text-gray-700 max-w-xs truncate">
        <code className="text-xs bg-gray-100 px-2 py-1 rounded">
          {connection.connectorUrl}
        </code>
      </td>
      <td className="px-6 py-4 text-sm text-gray-700 max-w-xs truncate">
        {connection.instructions}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleEdit(connection)}
            className="text-blue-600 hover:text-blue-800 transition-colors"
            title="Edit connection"
          >
            <FontAwesomeIcon icon={faPencilAlt} className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleDelete(connection)}
            className="text-red-600 hover:text-red-800 transition-colors"
            title="Delete connection"
          >
            <FontAwesomeIcon icon={faTrash} className="w-4 h-4" />
          </button>
        </div>
      </td>
    </tr>
  );

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Existing Connections</h2>
          <div className="text-sm text-gray-500">
            {filteredConnections.length} {filteredConnections.length === 1 ? 'connection' : 'connections'}
          </div>
        </div>
        <SearchBar
          value={searchQuery}
          onChange={onSearchChange}
          placeholder="Search by integration, name, source, or entity..."
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              {TABLE_HEADERS.map(renderTableHeaders)}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedConnections.length > 0 ? (
              paginatedConnections.map(renderPaginatedConnections)
            ) : (
              <tr>
                <td colSpan={8} className="px-6 py-8 text-center text-gray-500">
                  No connections found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="p-6 border-t border-gray-200">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        </div>
      )}
    </div>
  );
};

export default ConnectionsTable;

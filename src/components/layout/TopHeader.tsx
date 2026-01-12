import React, { useState, useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSearch,
  faBell,
  faQuestionCircle,
  faUser,
  faSignOutAlt,
  faCog,
} from '@fortawesome/free-solid-svg-icons';
import Dropdown from '@/components/common/Dropdown';
import { mockTenants } from '@/utils/data/mockData';

function TopHeader(): React.JSX.Element {
  const [selectedTenant, setSelectedTenant] = useState<string>(mockTenants[0].id);
  const [showUserMenu, setShowUserMenu] = useState<boolean>(false);

  const tenantOptions = useMemo(() =>
    mockTenants.map(tenant => ({
      id: tenant.id,
      label: tenant.name,
      value: tenant.id,
    })),
    []
  );

  const currentTenant = useMemo(() => mockTenants.find(t => t.id === selectedTenant), [selectedTenant]);

  const handleTenantChange = (tenantId: string) => {
    setSelectedTenant(tenantId);
  };

  const toggleUserMenu = () => {
    setShowUserMenu(prev => !prev);
  };

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between sticky top-0 z-40">
      {/* Tenant Switcher */}
      <div className="flex items-center gap-4 flex-1">
        <Dropdown
          options={tenantOptions}
          value={selectedTenant}
          onChange={handleTenantChange}
          searchable
          className="w-64"
        />
      </div>

      {/* Global Actions */}
      <div className="flex items-center gap-4">
        {/* Search Icon */}
        <button
          className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors"
          title="Search"
        >
          <FontAwesomeIcon icon={faSearch} className="w-5 h-5" />
        </button>

        {/* Notifications */}
        <button
          className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors relative"
          title="Notifications"
        >
          <FontAwesomeIcon icon={faBell} className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* Help */}
        <button
          className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors"
          title="Help"
        >
          <FontAwesomeIcon icon={faQuestionCircle} className="w-5 h-5" />
        </button>

        {/* User Profile */}
        <div className="relative">
          <button
            onClick={toggleUserMenu}
            className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg transition-colors"
            title="User menu"
          >
            <div className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-semibold">
              {currentTenant?.abbreviation || 'JA'}
            </div>
          </button>

          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-1">
              <button className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center gap-3 text-gray-700">
                <FontAwesomeIcon icon={faUser} className="w-4 h-4" />
                <span>Profile</span>
              </button>
              <button className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center gap-3 text-gray-700">
                <FontAwesomeIcon icon={faCog} className="w-4 h-4" />
                <span>Settings</span>
              </button>
              <hr className="my-1" />
              <button className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center gap-3 text-red-600">
                <FontAwesomeIcon icon={faSignOutAlt} className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default TopHeader;

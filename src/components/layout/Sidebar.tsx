import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBuilding,
  faWrench,
  faLeaf,
  faDesktop,
  faFileAlt,
  faCog,
  faUsers,
  faTags,
  faPlug,
  faSliders,
  faSitemap,
  faBoxes,
  faCloud,
  faCamera,
  faChevronDown,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { mockNavigation } from '@/utils/data/mockData';
import type { NavigationItem } from '@/utils/types';

const iconMap: Record<string, any> = {
  building: faBuilding,
  wrench: faWrench,
  leaf: faLeaf,
  desktop: faDesktop,
  'file-alt': faFileAlt,
  cog: faCog,
  users: faUsers,
  tags: faTags,
  plug: faPlug,
  sliders: faSliders,
  sitemap: faSitemap,
  boxes: faBoxes,
  cloud: faCloud,
  camera: faCamera,
};

function Sidebar(): React.JSX.Element {
  const location = useLocation();
  const [expandedSections, setExpandedSections] = useState<string[]>(['utilities']);

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev =>
      prev.includes(sectionId)
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const renderChildNavigationItem = (child: NavigationItem) => {
    const isActive: boolean = location.pathname === child.path;
    const activeNavigation: string = isActive ? 'bg-sidebar-active text-white' : 'hover:bg-sidebar-hover';
    return (
      <Link
        key={child.id}
        to={child.path || '#'}
        className={`flex items-center gap-3 px-3 py-2 rounded transition-colors ${activeNavigation}`}
      >
        <FontAwesomeIcon
          icon={iconMap[child.icon]}
          className="w-4 h-4"
        />
        <span className="text-sm">{child.label}</span>
      </Link>
    );
  };


  const renderNavigationItem = (section: NavigationItem) => {
    const isExpanded: boolean = expandedSections.includes(section.id);
    const hasChildren: boolean | undefined = section.children && section.children.length > 0;

    const handleSectionClick = () => hasChildren && toggleSection(section.id);

    return (
      <div key={section.id} className="mb-2">
        <button
          onClick={handleSectionClick}
          className="w-full flex items-center justify-between px-3 py-2 rounded hover:bg-sidebar-hover transition-colors text-left"
        >
          <div className="flex items-center gap-3">
            <FontAwesomeIcon icon={iconMap[section.icon]} className="w-4 h-4" />
            <span className="font-medium">{section.label}</span>
          </div>
          {hasChildren && <FontAwesomeIcon icon={isExpanded ? faChevronDown : faChevronRight} className="w-3 h-3" />}
        </button>

        {hasChildren && isExpanded && (
          <div className="ml-4 mt-1">
            {section.children?.map(renderChildNavigationItem)}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="w-64 bg-sidebar-bg text-white h-screen overflow-y-auto scrollbar-thin flex-shrink-0">
      <div className="p-4">
        <h1 className="text-xl font-bold mb-6">Integration Centre</h1>

        <div>
          {mockNavigation.map(renderNavigationItem)}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

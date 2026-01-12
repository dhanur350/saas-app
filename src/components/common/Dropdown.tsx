import { useState, useMemo, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { useClickOutside } from '@/hooks/useClickOutside';

interface DropdownOption {
  id: string;
  label: string;
  value: string;
}

interface DropdownProps {
  options: DropdownOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  searchable?: boolean;
  className?: string;
}

function Dropdown(props: DropdownProps) {
  const { options, value, onChange, placeholder = 'Select...', searchable = false, className = '' } = props;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const dropdownRef = useClickOutside<HTMLDivElement>(() => setIsOpen(false));

  const filteredOptions = useMemo(() => {
    if (!searchable || !searchQuery) return options;
    return options.filter(option =>
      option.label.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [options, searchQuery, searchable]);

  const selectedLabel = useMemo(() => {
    const selected = options.find(opt => opt.value === value);
    return selected ? selected.label : placeholder;
  }, [options, value, placeholder]);

  const handleSelect = useCallback((optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
    setSearchQuery('');
  }, [onChange]);

  const toggleDropdown = () => setIsOpen(prev => !prev);

  const renderFilteredOptions = (option: DropdownOption) => {
    const isSelected: string = option.value === value ? 'bg-primary-50 text-primary-700' : 'text-gray-900';
    return (
      <button
        key={option.id}
        type="button"
        onClick={() => handleSelect(option.value)}
        className={`w-full px-4 py-2 text-left hover:bg-gray-100 transition-colors ${isSelected}`}
      >
        {option.label}
      </button>
    );
  };

  return (
    <div ref={dropdownRef} className={`relative ${className}`}>
      <button
        type="button"
        onClick={toggleDropdown}
        className="w-full px-4 py-2 text-left bg-white border border-gray-300 rounded-md shadow-sm hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 flex items-center justify-between"
      >
        <span className="truncate">{selectedLabel}</span>
        <FontAwesomeIcon
          icon={faChevronDown}
          className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
          {searchable && (
            <div className="p-2 border-b">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Type to filter..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          )}
          <div className="py-1">
            {filteredOptions.length > 0 ? filteredOptions.map(renderFilteredOptions) : (
              <div className="px-4 py-2 text-gray-500 text-sm">No options found</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;

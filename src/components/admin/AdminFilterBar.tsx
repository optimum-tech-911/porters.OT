/**
 * AdminFilterBar — Horizontal filter bar with dropdowns and search
 */
import { useState } from 'react';

export interface FilterConfig {
  key: string;
  label: string;
  options: { value: string; label: string }[];
}

interface Props {
  filters: FilterConfig[];
  searchPlaceholder?: string;
  onFilterChange?: (filters: Record<string, string>) => void;
  onSearchChange?: (query: string) => void;
}

export default function AdminFilterBar({
  filters,
  searchPlaceholder = 'Rechercher...',
  onFilterChange,
  onSearchChange,
}: Props) {
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({});
  const [searchQuery, setSearchQuery] = useState('');

  const handleFilterChange = (key: string, value: string) => {
    const updated = { ...activeFilters, [key]: value };
    if (value === '') delete updated[key];
    setActiveFilters(updated);
    onFilterChange?.(updated);
  };

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    onSearchChange?.(value);
  };

  const clearFilter = (key: string) => {
    const updated = { ...activeFilters };
    delete updated[key];
    setActiveFilters(updated);
    onFilterChange?.(updated);
  };

  const activeFilterEntries = Object.entries(activeFilters).filter(([, v]) => v !== '');

  return (
    <div>
      <div className="admin-filter-bar">
        {filters.map((filter) => (
          <select
            key={filter.key}
            className="admin-filter-select"
            value={activeFilters[filter.key] || ''}
            onChange={(e) => handleFilterChange(filter.key, e.target.value)}
          >
            <option value="">{filter.label}</option>
            {filter.options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        ))}
        <input
          type="text"
          className="admin-filter-search"
          placeholder={searchPlaceholder}
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>

      {activeFilterEntries.length > 0 && (
        <div className="admin-filter-tags" style={{ marginBottom: '1rem' }}>
          {activeFilterEntries.map(([key, value]) => {
            const filterDef = filters.find((f) => f.key === key);
            const optLabel = filterDef?.options.find((o) => o.value === value)?.label || value;
            return (
              <span key={key} className="admin-filter-tag" onClick={() => clearFilter(key)}>
                {filterDef?.label}: {optLabel} ✕
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
}

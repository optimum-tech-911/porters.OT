/**
 * AdminTable — Generic responsive table with typed columns
 * TODO: When Supabase is connected, implement real sorting and pagination.
 */
import { useState } from 'react';

export interface Column<T> {
  key: string;
  label: string;
  sortable?: boolean;
  render?: (row: T) => React.ReactNode;
  className?: string;
}

interface Props<T> {
  columns: Column<T>[];
  data: T[];
  onRowClick?: (row: T) => void;
  emptyMessage?: string;
  pageSize?: number;
}

export default function AdminTable<T extends { id: string }>({
  columns,
  data,
  onRowClick,
  emptyMessage = 'Aucune donnée disponible.',
  pageSize = 10,
}: Props<T>) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / pageSize);
  const paginatedData = data.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  if (data.length === 0) {
    return (
      <div className="admin-table-wrapper">
        <div className="admin-empty-state">
          <div className="admin-empty-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
              <polyline points="14,2 14,8 20,8" />
            </svg>
          </div>
          <p className="admin-empty-title">Aucun résultat</p>
          <p className="admin-empty-message">{emptyMessage}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-table-wrapper">
      <table className={`admin-table${onRowClick ? ' admin-table-clickable' : ''}`}>
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key} className={col.sortable ? 'sortable' : ''}>
                {col.label}
                {col.sortable && (
                  <span style={{ marginLeft: '0.25rem', opacity: 0.4, fontSize: '0.625rem' }}>↕</span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((row) => (
            <tr
              key={row.id}
              onClick={onRowClick ? () => onRowClick(row) : undefined}
            >
              {columns.map((col) => (
                <td key={col.key} className={col.className || ''}>
                  {col.render
                    ? col.render(row)
                    : String((row as Record<string, unknown>)[col.key] ?? '')
                  }
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {totalPages > 1 && (
        <div className="admin-pagination">
          <span>
            {(currentPage - 1) * pageSize + 1}–{Math.min(currentPage * pageSize, data.length)} sur {data.length}
          </span>
          <div className="admin-pagination-buttons">
            <button
              className="admin-pagination-btn"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
            >
              ←
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                className={`admin-pagination-btn${currentPage === i + 1 ? ' active' : ''}`}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
            <button
              className="admin-pagination-btn"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
            >
              →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

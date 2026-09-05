import React, { useState, useMemo } from 'react';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from './Table';
import { SearchBox } from './SearchBox';
import { Pagination } from './Pagination';
import { Button } from './Button';
import { ArrowUpDown, ArrowUp, ArrowDown, SlidersHorizontal, EyeOff, Check } from 'lucide-react';
import { Dropdown } from './Dropdown';
import { cn } from '../../utils/cn';

export interface Column<T> {
  key: keyof T | string;
  header: string;
  render?: (row: T) => React.ReactNode;
  sortable?: boolean;
}

export interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  searchPlaceholder?: string;
  pageSize?: number;
  className?: string;
}

export function DataTable<T extends Record<string, any>>({
  columns,
  data,
  searchPlaceholder = 'Tabloda ara...',
  pageSize = 5,
  className,
}: DataTableProps<T>) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [hiddenColumns, setHiddenColumns] = useState<string[]>([]);

  // Filter
  const filteredData = useMemo(() => {
    if (!searchQuery.trim()) return data;
    const query = searchQuery.toLowerCase();
    return data.filter((row) =>
      Object.values(row).some((val) =>
        String(val).toLowerCase().includes(query)
      )
    );
  }, [data, searchQuery]);

  // Sort
  const sortedData = useMemo(() => {
    if (!sortKey) return filteredData;
    return [...filteredData].sort((a, b) => {
      const valA = a[sortKey];
      const valB = b[sortKey];
      if (valA < valB) return sortDirection === 'asc' ? -1 : 1;
      if (valA > valB) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filteredData, sortKey, sortDirection]);

  // Paginate
  const totalPages = Math.ceil(sortedData.length / pageSize) || 1;
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return sortedData.slice(start, start + pageSize);
  }, [sortedData, currentPage, pageSize]);

  const handleSort = (key: string) => {
    if (sortKey === key) {
      if (sortDirection === 'asc') setSortDirection('desc');
      else {
        setSortKey(null);
        setSortDirection('asc');
      }
    } else {
      setSortKey(key);
      setSortDirection('asc');
    }
  };

  const visibleColumns = useMemo(
    () => columns.filter((col) => !hiddenColumns.includes(String(col.key))),
    [columns, hiddenColumns]
  );

  const toggleColumnHide = (key: string) => {
    setHiddenColumns((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const columnDropdownItems = columns.map((col) => ({
    id: String(col.key),
    label: col.header,
    icon: !hiddenColumns.includes(String(col.key)) ? <Check className="w-4 h-4 text-burgundy-700" /> : <EyeOff className="w-4 h-4 text-slate-400" />,
    onClick: () => toggleColumnHide(String(col.key)),
  }));

  return (
    <div className={cn('space-y-4', className)}>
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="w-full sm:w-72">
          <SearchBox
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            onClear={() => setSearchQuery('')}
            placeholder={searchPlaceholder}
          />
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <Dropdown
            align="right"
            trigger={
              <Button variant="secondary" size="sm" leftIcon={<SlidersHorizontal className="w-3.5 h-3.5" />}>
                Sütunlar ({visibleColumns.length}/{columns.length})
              </Button>
            }
            items={columnDropdownItems}
          />
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            {visibleColumns.map((col) => (
              <TableHead key={String(col.key)}>
                {col.sortable !== false ? (
                  <button
                    type="button"
                    onClick={() => handleSort(String(col.key))}
                    className="flex items-center gap-1.5 hover:text-burgundy-700 transition-colors uppercase font-bold text-xs"
                  >
                    <span>{col.header}</span>
                    {sortKey === String(col.key) ? (
                      sortDirection === 'asc' ? (
                        <ArrowUp className="w-3.5 h-3.5 text-burgundy-700" />
                      ) : (
                        <ArrowDown className="w-3.5 h-3.5 text-burgundy-700" />
                      )
                    ) : (
                      <ArrowUpDown className="w-3.5 h-3.5 text-slate-400 opacity-60" />
                    )}
                  </button>
                ) : (
                  <span>{col.header}</span>
                )}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedData.length > 0 ? (
            paginatedData.map((row, idx) => (
              <TableRow key={idx}>
                {visibleColumns.map((col) => (
                  <TableCell key={String(col.key)}>
                    {col.render ? col.render(row) : row[col.key as keyof T]}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={visibleColumns.length} className="text-center py-8 text-slate-500 dark:text-slate-400">
                Kayıt bulunamadı.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
          <span className="text-xs text-slate-500 dark:text-slate-400">
            Toplam <strong>{sortedData.length}</strong> kayıttan <strong>{Math.min((currentPage - 1) * pageSize + 1, sortedData.length)}</strong> - <strong>{Math.min(currentPage * pageSize, sortedData.length)}</strong> arası gösteriliyor
          </span>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(p) => setCurrentPage(p)}
          />
        </div>
      )}
    </div>
  );
}

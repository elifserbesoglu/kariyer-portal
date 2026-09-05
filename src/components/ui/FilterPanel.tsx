import React from 'react';
import { cn } from '../../utils/cn';
import { Button } from './Button';
import { Checkbox } from './Checkbox';
import { Select } from './Select';

export interface FilterSection {
  id: string;
  title: string;
  options: { label: string; value: string; count?: number }[];
}

export interface FilterPanelProps {
  sections: FilterSection[];
  selectedFilters: Record<string, string[]>;
  onFilterChange: (sectionId: string, value: string) => void;
  onClearAll: () => void;
  className?: string;
}

export const FilterPanel: React.FC<FilterPanelProps> = ({
  sections,
  selectedFilters,
  onFilterChange,
  onClearAll,
  className,
}) => {
  return (
    <div className={cn('bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-6', className)}>
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">Filtrele</h3>
        <button
          type="button"
          onClick={onClearAll}
          className="text-xs font-semibold text-burgundy-700 dark:text-burgundy-400 hover:underline"
        >
          Temizle
        </button>
      </div>

      {sections.map((section) => {
        const activeValues = selectedFilters[section.id] || [];

        return (
          <div key={section.id} className="space-y-3">
            <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
              {section.title}
            </h4>
            <div className="space-y-2">
              {section.options.map((option) => (
                <div key={option.value} className="flex items-center justify-between">
                  <Checkbox
                    label={option.label}
                    checked={activeValues.includes(option.value)}
                    onChange={() => onFilterChange(section.id, option.value)}
                  />
                  {option.count !== undefined && (
                    <span className="text-[11px] font-medium text-slate-400 dark:text-slate-500">
                      ({option.count})
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      })}

      <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
        <Select
          label="Fakülte / Bölüm"
          placeholder="Seçiniz"
          options={[
            { value: 'muhendislik', label: 'Mühendislik ve Doğa Bilimleri Fakültesi' },
            { value: 'mimarlik', label: 'Mimarlık ve Tasarım Fakültesi' },
            { value: 'teknik', label: 'Teknik Bilimler MYO' },
          ]}
        />
      </div>

      <Button variant="primary" fullWidth size="md">
        Filtreleri Uygula
      </Button>
    </div>
  );
};

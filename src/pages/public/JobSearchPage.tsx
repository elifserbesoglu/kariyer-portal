import React, { useState, useEffect, useMemo } from 'react';
import { usePublicRouter } from '../../router/PublicRouter';
import { setPageTitle } from '../../utils/seo';
import { Breadcrumb } from '../../components/ui/Breadcrumb';
import { SearchBox } from '../../components/ui/SearchBox';
import { Select } from '../../components/ui/Select';
import { FilterPanel } from '../../components/ui/FilterPanel';
import { JobCard } from '../../components/cards/JobCard';
import { Pagination } from '../../components/ui/Pagination';
import { SectionTitle } from '../../components/ui/SectionTitle';
import { EmptyState } from '../../components/ui/EmptyState';
import { useWorkflow } from '../../context/WorkflowContext';
import { getCombinedJobListings } from '../../utils/jobMapper';
import { LayoutGrid, List } from 'lucide-react';

export const JobSearchPage: React.FC = () => {
  const { navigate } = usePublicRouter();
  const { jobs: workflowJobs } = useWorkflow();
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [sortOption, setSortOption] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);

  const allJobsings = useMemo(() => {
    return getCombinedJobListings(workflowJobs);
  }, [workflowJobs]);

  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({
    jobType: [],
    workType: [],
  });

  useEffect(() => {
    setPageTitle('İş ve Staj İlanları', 'KTÜN Kariyer Portalı onaylı iş ve staj ilanlarını arayın ve filtreleyin.');
  }, []);

  const filterSections = [
    {
      id: 'jobType',
      title: 'İlan Türü',
      options: [
        { label: 'İş İlanı', value: 'İş İlanı', count: allJobsings.filter((j) => j.jobType === 'İş İlanı').length },
        { label: 'Staj İlanı', value: 'Staj İlanı', count: allJobsings.filter((j) => j.jobType === 'Staj İlanı').length },
      ],
    },
    {
      id: 'workType',
      title: 'Çalışma Şekli',
      options: [
        { label: 'Tam Zamanlı', value: 'Tam Zamanlı', count: allJobsings.filter((j) => j.workType === 'Tam Zamanlı').length },
        { label: 'Yarı Zamanlı', value: 'Yarı Zamanlı', count: allJobsings.filter((j) => j.workType === 'Yarı Zamanlı').length },
        { label: 'Uzaktan', value: 'Uzaktan', count: allJobsings.filter((j) => j.workType === 'Uzaktan').length },
        { label: 'Hibrit', value: 'Hibrit', count: allJobsings.filter((j) => j.workType === 'Hibrit').length },
      ],
    },
  ];

  const handleFilterChange = (sectionId: string, value: string) => {
    setSelectedFilters((prev) => {
      const current = prev[sectionId] || [];
      const updated = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      return { ...prev, [sectionId]: updated };
    });
    setCurrentPage(1);
  };

  const handleClearAll = () => {
    setSelectedFilters({ jobType: [], workType: [] });
    setSearchQuery('');
    setCurrentPage(1);
  };

  const filteredJobs = useMemo(() => {
    return allJobsings.filter((job) => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = job.title.toLowerCase().includes(q);
        const matchesCompany = job.companyName.toLowerCase().includes(q);
        const matchesLocation = job.location.toLowerCase().includes(q);
        if (!matchesTitle && !matchesCompany && !matchesLocation) return false;
      }
      if (selectedFilters.jobType && selectedFilters.jobType.length > 0) {
        if (!selectedFilters.jobType.includes(job.jobType)) return false;
      }
      if (selectedFilters.workType && selectedFilters.workType.length > 0) {
        if (!selectedFilters.workType.includes(job.workType)) return false;
      }
      return true;
    });
  }, [allJobsings, searchQuery, selectedFilters]);

  const pageSize = 4;
  const totalPages = Math.ceil(filteredJobs.length / pageSize) || 1;
  const paginatedJobs = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredJobs.slice(start, start + pageSize);
  }, [filteredJobs, currentPage]);

  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: 'İş ve Staj İlanları' }]} />

      <SectionTitle
        title="İş ve Staj İlanları"
        subtitle="Kariyer hedeflerinize uygun güncel iş ve staj fırsatlarını keşfedin."
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        <FilterPanel
          sections={filterSections}
          selectedFilters={selectedFilters}
          onFilterChange={handleFilterChange}
          onClearAll={handleClearAll}
          className="sticky top-24"
        />

        <div className="lg:col-span-3 space-y-5">
          <div className="bg-white dark:bg-slate-900 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="w-full sm:w-80">
              <SearchBox
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onClear={() => setSearchQuery('')}
                placeholder="Pozisyon, firma veya şehir ara..."
              />
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
              <Select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                options={[
                  { value: 'newest', label: 'Sırala: En Yeni İlanlar' },
                  { value: 'popular', label: 'Sırala: En Çok Görüntülenen' },
                ]}
                className="w-48 text-xs"
              />

              <div className="flex items-center border border-slate-200 dark:border-slate-800 rounded-lg p-1 bg-slate-50 dark:bg-slate-800">
                <button
                  type="button"
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded ${viewMode === 'list' ? 'bg-white dark:bg-slate-900 shadow-xs text-burgundy-700' : 'text-slate-400'}`}
                >
                  <List className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded ${viewMode === 'grid' ? 'bg-white dark:bg-slate-900 shadow-xs text-burgundy-700' : 'text-slate-400'}`}
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {paginatedJobs.length > 0 ? (
            <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 gap-4' : 'space-y-4'}>
              {paginatedJobs.map((job) => (
                <JobCard
                  key={job.id}
                  id={job.id}
                  companyName={job.companyName}
                  companyLogo={job.companyLogo}
                  title={job.title}
                  location={job.location}
                  workType={job.workType}
                  experience={job.experience}
                  department={job.department}
                  deadline={job.deadline}
                  isFeatured={job.isFeatured}
                  onClick={() => navigate('job-detail', { id: job.id })}
                />
              ))}
            </div>
          ) : (
            <EmptyState
              title="Aramanızla Eşleşen İlan Bulunamadı"
              description="Lütfen farklı anahtar kelimeler deneyin veya uyguladığınız filtreleri temizleyin."
              actionLabel="Filtreleri Temizle"
              onAction={handleClearAll}
            />
          )}

          {totalPages > 1 && (
            <div className="pt-4 flex justify-center">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(p) => setCurrentPage(p)}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

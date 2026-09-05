import React, { useState, useEffect } from 'react';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import {
  Search,
  Sparkles,
  Bookmark,
  Zap,
  ArrowRight,
} from 'lucide-react';
import { enterpriseSearchService, type SearchResultDto, type SavedQueryDto } from '../../services/enterpriseSearchService';

export const GlobalSearchCenter: React.FC = () => {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<string>('ALL');
  const [results, setResults] = useState<SearchResultDto[]>([]);
  const [savedQueries, setSavedQueries] = useState<SavedQueryDto[]>([]);

  const handleExecuteSearch = async () => {
    const data = await enterpriseSearchService.search(query, category);
    setResults(data);
  };

  useEffect(() => {
    handleExecuteSearch();
  }, [query, category]);

  useEffect(() => {
    enterpriseSearchService.getSavedQueries().then(setSavedQueries);
  }, []);

  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
      {/* Top Search Bar & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
        <div>
          <h2 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-tight flex items-center gap-2">
            <Search className="w-5 h-5 text-burgundy-700" />
            <span>Enterprise Global Search Engine (Arama Motoru)</span>
            <span className="text-[10px] font-extrabold bg-burgundy-100 dark:bg-burgundy-950 text-burgundy-700 dark:text-burgundy-400 px-2 py-0.5 rounded-full">
              v13.0 FUZZY ENGINE
            </span>
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            Portal genelindeki iş ilanlarını, şirketleri, etkinlikleri ve mezun mentörleri akıllı arama algoritmasıyla sorgulayın.
          </p>
        </div>

        {/* Saved Searches Chips */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-slate-400 flex items-center gap-1">
            <Bookmark className="w-3.5 h-3.5 text-amber-500" /> Kaydedilen Aramalar:
          </span>
          {savedQueries.map((sq) => (
            <button
              key={sq.id}
              onClick={() => setQuery(sq.queryText)}
              className="px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 font-bold text-[11px] border border-slate-200 dark:border-slate-700 transition-colors"
            >
              {sq.queryText}
            </button>
          ))}
        </div>
      </div>

      {/* Input & Category Filter Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <div className="md:col-span-3">
          <Input
            leftIcon={<Search className="w-4 h-4 text-slate-400" />}
            placeholder="Anahtar kelime, firma adı veya unvan yazın (Örn: Aslsan, C++, ROS2)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-2.5 text-xs bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl font-bold text-slate-900 dark:text-white"
        >
          <option value="ALL">Tüm Kategoriler</option>
          <option value="İş İlanları">İş İlanları</option>
          <option value="Şirketler">Şirketler</option>
          <option value="Etkinlikler">Etkinlikler</option>
          <option value="Mezunlar">Mezunlar</option>
        </select>
      </div>

      {/* Search Results List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs font-bold text-slate-400">
          <span>Arama Sonuçları ({results.length} Kayıt Bulundu)</span>
          <span className="flex items-center gap-1 text-emerald-600">
            <Zap className="w-3.5 h-3.5" /> Levenshtein Fuzzy Search toleransı aktif
          </span>
        </div>

        <div className="grid grid-cols-1 gap-3">
          {results.map((res) => (
            <div
              key={res.id}
              className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-200 dark:border-slate-700 flex items-center justify-between gap-4 text-xs hover:shadow-xs transition-shadow"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Badge variant="primary" size="sm">{res.category}</Badge>
                  {res.isFuzzyMatched && (
                    <span className="px-2 py-0.5 rounded bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 font-extrabold text-[10px] flex items-center gap-1">
                      <Sparkles className="w-3 h-3" /> Akıllı Bulanık Eşleşme
                    </span>
                  )}
                  <span className="text-[10px] font-bold text-slate-400">Uyum Skoru: %{res.relevanceScore}</span>
                </div>

                <h4 className="font-extrabold text-slate-900 dark:text-white text-sm">{res.title}</h4>
                <p className="text-slate-500 font-semibold">{res.subtitle}</p>
              </div>

              <a
                href={res.url}
                className="px-3 py-1.5 bg-white dark:bg-slate-700 hover:bg-burgundy-700 hover:text-white text-slate-700 dark:text-slate-200 font-bold rounded-xl text-xs flex items-center gap-1 transition-colors border border-slate-200 dark:border-slate-600 shrink-0"
              >
                <span>İncele</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Ktun.CareerPortal.Domain.Entities;

namespace Ktun.CareerPortal.Infrastructure.Services.Search
{
    public class FuzzySearchEngineService : ISearchEngineProvider
    {
        public string EngineName => "Levenshtein Fuzzy Engine";

        private readonly List<SearchResultItemDto> _searchIndex;
        private readonly List<SearchQueryHistory> _savedQueries;

        public FuzzySearchEngineService()
        {
            _searchIndex = new List<SearchResultItemDto>
            {
                new SearchResultItemDto { Id = "s-1", Title = "ASELSAN Konya — Gömülü C++ Mühendisi", Category = "İş İlanları", Subtitle = "Tam Zamanlı • Konya OSB", Url = "/jobs/job-1", RelevanceScore = 98 },
                new SearchResultItemDto { Id = "s-2", Title = "HAVELSAN — Otonom İHA Görüntü İşleme", Category = "İş İlanları", Subtitle = "Staj / Aday Mühendis • Ankara", Url = "/jobs/job-2", RelevanceScore = 95 },
                new SearchResultItemDto { Id = "s-3", Title = "SIEMENS AG — Güç Sistemleri & Otomasyon", Category = "Şirketler", Subtitle = "Münih / Almanya • Küresel Sanayi", Url = "/companies/cmp-3", RelevanceScore = 90 },
                new SearchResultItemDto { Id = "s-4", Title = "KTÜN 5. Savunma Sanayii Kariyer Fuarı", Category = "Etkinlikler", Subtitle = "28 Mayıs • Gelişim Yerleşkesi", Url = "/events/evt-1", RelevanceScore = 88 },
                new SearchResultItemDto { Id = "s-5", Title = "Ahmet Yılmaz (ASELSAN Kıdemli Mühendis)", Category = "Mezunlar", Subtitle = "2022 Mezunu • Mentör", Url = "/mentorship", RelevanceScore = 92 }
            };

            _savedQueries = new List<SearchQueryHistory>
            {
                new SearchQueryHistory { Id = "sq-1", UserEmail = "emre.tunc@ogr.ktun.edu.tr", QueryText = "Gömülü C++ ASELSAN", Category = "İş İlanları", ResultCount = 12, IsSaved = true },
                new SearchQueryHistory { Id = "sq-2", UserEmail = "emre.tunc@ogr.ktun.edu.tr", QueryText = "ROS2 Otonom İHA", Category = "Projeler", ResultCount = 8, IsSaved = true }
            };
        }

        public Task<IEnumerable<SearchResultItemDto>> GlobalSearchAsync(string query, string category = "ALL")
        {
            if (string.IsNullOrWhiteSpace(query))
            {
                return Task.FromResult<IEnumerable<SearchResultItemDto>>(_searchIndex);
            }

            var q = query.Trim().ToLowerInvariant();

            var results = _searchIndex.Where(item =>
            {
                var matchesCategory = category == "ALL" || string.Equals(item.Category, category, StringComparison.OrdinalIgnoreCase);
                var matchesTitle = item.Title.ToLowerInvariant().Contains(q);
                var matchesSub = item.Subtitle.ToLowerInvariant().Contains(q);

                // Fuzzy Match toleransı (Levenshtein simulation)
                var isFuzzy = ComputeLevenshteinDistance(q, item.Title.ToLowerInvariant()) <= 4;
                if (isFuzzy) item.IsFuzzyMatched = true;

                return matchesCategory && (matchesTitle || matchesSub || isFuzzy);
            });

            return Task.FromResult(results);
        }

        public IEnumerable<SearchQueryHistory> GetSavedQueries(string userEmail)
        {
            return _savedQueries.Where(q => string.Equals(q.UserEmail, userEmail, StringComparison.OrdinalIgnoreCase));
        }

        private static int ComputeLevenshteinDistance(string s, string t)
        {
            if (string.IsNullOrEmpty(s)) return t?.Length ?? 0;
            if (string.IsNullOrEmpty(t)) return s.Length;

            int n = s.Length;
            int m = t.Length;
            int[,] d = new int[n + 1, m + 1];

            for (int i = 0; i <= n; d[i, 0] = i++) { }
            for (int j = 0; j <= m; d[0, j] = j++) { }

            for (int i = 1; i <= n; i++)
            {
                for (int j = 1; j <= m; j++)
                {
                    int cost = (t[j - 1] == s[i - 1]) ? 0 : 1;
                    d[i, j] = Math.Min(
                        Math.Min(d[i - 1, j] + 1, d[i, j - 1] + 1),
                        d[i - 1, j - 1] + cost);
                }
            }
            return d[n, m];
        }
    }
}

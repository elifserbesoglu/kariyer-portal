using System.Collections.Generic;
using System.Threading.Tasks;

namespace Ktun.CareerPortal.Infrastructure.Services.Search
{
    public interface ISearchEngineProvider
    {
        string EngineName { get; }
        Task<IEnumerable<SearchResultItemDto>> GlobalSearchAsync(string query, string category = "ALL");
    }

    public class SearchResultItemDto
    {
        public string Id { get; set; } = string.Empty;
        public string Title { get; set; } = string.Empty;
        public string Category { get; set; } = string.Empty;
        public string Subtitle { get; set; } = string.Empty;
        public string Url { get; set; } = string.Empty;
        public bool IsFuzzyMatched { get; set; }
        public int RelevanceScore { get; set; }
    }
}

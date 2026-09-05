using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Ktun.CareerPortal.Infrastructure.Services.Search;

namespace Ktun.CareerPortal.Api.Controllers
{
    [ApiController]
    [Route("api/v1/search")]
    public class SearchController : ControllerBase
    {
        private readonly FuzzySearchEngineService _searchService;

        public SearchController()
        {
            _searchService = new FuzzySearchEngineService();
        }

        [HttpGet("query")]
        public async Task<IActionResult> Query([FromQuery] string q = "", [FromQuery] string category = "ALL")
        {
            var results = await _searchService.GlobalSearchAsync(q, category);
            return Ok(results);
        }

        [HttpGet("saved")]
        public IActionResult GetSavedQueries([FromQuery] string userEmail = "emre.tunc@ogr.ktun.edu.tr")
        {
            var queries = _searchService.GetSavedQueries(userEmail);
            return Ok(queries);
        }
    }
}

namespace help_reviews.Controllers;

[Authorize] // REVIEW this locks down the entire controller with auth
[ApiController]
[Route("api/[controller]")]
public class ReportsController : ControllerBase
{
  private readonly Auth0Provider _auth0Provider;
  private readonly ReportsService _reportsService;

  public ReportsController(Auth0Provider auth0Provider, ReportsService reportsService)
  {
    _auth0Provider = auth0Provider;
    _reportsService = reportsService;
  }

  [HttpPost]
  public async Task<ActionResult<Report>> CreateReport([FromBody] Report reportData)
  {
    try
    {
      Account userInfo = await _auth0Provider.GetUserInfoAsync<Account>(HttpContext);
      reportData.CreatorId = userInfo.Id;
      Report report = _reportsService.CreateReport(reportData);
      return Ok(report);
    }
    catch (Exception exception)
    {
      return BadRequest(exception.Message);
    }
  }


}

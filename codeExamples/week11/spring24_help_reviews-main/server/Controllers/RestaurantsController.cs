namespace help_reviews.Controllers;

[ApiController]
[Route("api/[controller]")]
public class RestaurantsController : ControllerBase
{
  private readonly RestaurantsService _restaurantsService;
  private readonly Auth0Provider _auth0Provider;

  private readonly ReportsService _reportsService;

  public RestaurantsController(RestaurantsService restaurantsService, Auth0Provider auth0Provider, ReportsService reportsService)
  {
    _restaurantsService = restaurantsService;
    _auth0Provider = auth0Provider;
    _reportsService = reportsService;
  }

  [HttpPost]
  [Authorize]
  public async Task<ActionResult<Restaurant>> CreateRestaurant([FromBody] Restaurant restaurantData)
  {
    try
    {
      Account userInfo = await _auth0Provider.GetUserInfoAsync<Account>(HttpContext);
      restaurantData.CreatorId = userInfo.Id;
      Restaurant restaurant = _restaurantsService.CreateRestaurant(restaurantData);
      return Ok(restaurant);
    }
    catch (Exception exception)
    {
      return BadRequest(exception.Message);
    }
  }

  [HttpGet]
  public async Task<ActionResult<List<Restaurant>>> GetAllRestaurants()
  {
    try
    {
      // We can still see who is logged in even if the route is not authorized
      Account userInfo = await _auth0Provider.GetUserInfoAsync<Account>(HttpContext);

      // NOTE userInfo?.Id does not drill into userInfo if null (user is not logged in)
      List<Restaurant> restaurants = _restaurantsService.GetAllRestaurants(userInfo?.Id);
      return Ok(restaurants);
    }
    catch (Exception exception)
    {
      return BadRequest(exception.Message);
    }
  }

  // NOTE not an authorized route
  [HttpGet("{restaurantId}")]
  public async Task<ActionResult<Restaurant>> GetRestaurantById(int restaurantId)
  {
    try
    {
      // We can still see who is logged in even if the route is not authorized
      Account userInfo = await _auth0Provider.GetUserInfoAsync<Account>(HttpContext);

      // NOTE userInfo?.Id does not drill into userInfo if null (user is not logged in)
      Restaurant restaurant = _restaurantsService.IncrementVisits(restaurantId, userInfo?.Id);
      return Ok(restaurant);
    }
    catch (Exception exception)
    {
      return BadRequest(exception.Message);
    }
  }

  [HttpPut("{restaurantId}")]
  [Authorize]
  public async Task<ActionResult<Restaurant>> UpdateRestaurant(int restaurantId, [FromBody] Restaurant restaurantData)
  {
    try
    {
      Account userInfo = await _auth0Provider.GetUserInfoAsync<Account>(HttpContext);
      Restaurant restaurant = _restaurantsService.UpdateRestaurant(restaurantData, restaurantId, userInfo.Id);
      return Ok(restaurant);
    }
    catch (Exception exception)
    {
      return BadRequest(exception.Message);
    }
  }

  [HttpGet("{restaurantId}/reports")]
  public async Task<ActionResult<List<Report>>> GetReportsByRestaurantId(int restaurantId)
  {
    try
    {
      Account userInfo = await _auth0Provider.GetUserInfoAsync<Account>(HttpContext);
      List<Report> reports = _reportsService.GetReportsByRestaurantId(restaurantId, userInfo?.Id);
      return Ok(reports);
    }
    catch (Exception exception)
    {
      return BadRequest(exception.Message);
    }
  }
}

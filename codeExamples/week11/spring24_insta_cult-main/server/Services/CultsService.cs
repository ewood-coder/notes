

namespace insta_cult.Services;

public class CultsService
{
  private readonly CultsRepository _repository;

  public CultsService(CultsRepository repository)
  {
    _repository = repository;
  }

  internal Cult CreateCult(Cult cultData)
  {
    Cult cult = _repository.CreateCult(cultData);
    return cult;
  }

  internal void DestroyCult(int cultId, string userId)
  {
    Cult cult = GetCultById(cultId);

    if (cult.LeaderId != userId)
    {
      throw new Exception("NOT YOUR CULT");
    }

    _repository.DestroyCult(cultId);
  }

  internal List<Cult> GetAllCults()
  {
    List<Cult> cults = _repository.GetAllCults();
    return cults;
  }

  internal Cult GetCultById(int cultId)
  {
    Cult cult = _repository.GetCultById(cultId);

    if (cult == null)
    {
      throw new Exception($"Invalid cult id: {cultId}");
    }

    return cult;
  }
}






namespace insta_cult.Services;

public class CultMembersService
{
  private readonly CultMembersRepository _repository;
  private readonly CultsService _cultsService;

  public CultMembersService(CultMembersRepository repository, CultsService cultsService)
  {
    _repository = repository;
    _cultsService = cultsService;
  }

  internal Cultist CreateCultMember(CultMember cultMemberData)
  {
    Cultist cultist = _repository.CreateCultMember(cultMemberData);
    return cultist;
  }

  internal CultMember GetCultMemberById(int cultMemberId)
  {
    CultMember cultMember = _repository.GetCultMemberById(cultMemberId);

    if (cultMember == null)
    {
      throw new Exception($"Invlaid cult member id: {cultMemberId}");
    }

    return cultMember;
  }

  // NOTE only the leader of a cult can remove cultMembers, might not be a great reference for everything
  internal string DestroyCultMember(int cultMemberId, string userId)
  {
    // FIXME change this to cultist if you have time
    CultMember cultMember = GetCultMemberById(cultMemberId);

    Cult cult = _cultsService.GetCultById(cultMember.CultId);

    if (cult.LeaderId != userId)
    {
      throw new Exception($"Nice try loser, please come to the 'reprogramming room' immediately. Escape is not an option. {cult.Leader.Name} is very saddened. I hope you're happy.");
    }

    _repository.DestroyCultMember(cultMemberId);

    return $"Removed cultist from {cult.Name}!";
  }

  internal List<Cultist> GetCultistsByCultId(int cultId)
  {
    List<Cultist> cultists = _repository.GetCultistsByCultId(cultId);
    return cultists;
  }
}
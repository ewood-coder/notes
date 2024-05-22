namespace insta_cult.Models;

// NOTE supports data for cultMember table
public class CultMember : RepoItem<int>
{
  public int CultId { get; set; }
  public string AccountId { get; set; }
}
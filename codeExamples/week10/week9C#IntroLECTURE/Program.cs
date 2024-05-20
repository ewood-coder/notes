public class Program
{
  // NOTE arrays are stinky
  private static string[] FavoriteFoods = ["lasagna", "fettuccine", "cappicola", "ram", "tacos al pastor", "pizza bagel bites"];

  // NOTE Lists are C O O L 😎
  private static List<Friend> Friends = [
    new Friend("Mick", 20, "gabbaghoul"),
    new Friend("Jake", 30, "Hot dogs off of his kid's plates"),
    new Friend("Garfield", 65, "lasagna")
  ];



  private static void Main()
  {
    Console.Clear();
    Console.WriteLine("Hello, new friend!");
    Console.WriteLine("What is your name?");

    string userName = Console.ReadLine();

    Console.WriteLine($"Nice to meet you {userName}! I sure do like the name {userName}, I will name my firstborn after you!");

    Console.WriteLine($"How old are you {userName}?");

    int userAge = GetUserAge();

    Console.WriteLine($"Dang, you are {userAge} years old?");
    Console.WriteLine($"That's crazy! My grandma is twice as old as you! She is {userAge * 2} years old!");

    Console.WriteLine($"{userName}, what do {userAge} year olds eat nowadays?");

    string userFavoriteFood = Console.ReadLine();

    Console.WriteLine($"Your favorite food is {userFavoriteFood}?");

    if (FavoriteFoods.Contains(userFavoriteFood))
    {
      Console.WriteLine($"That is absolutely CRAZY! I also love {userFavoriteFood}");
    }
    else
    {
      Console.WriteLine($"I have never heard of {userFavoriteFood}.");
    }

    Console.WriteLine("Here are all of my favorite foods in order of deliciousness:");

    for (int i = 0; i < FavoriteFoods.Length; i++)
    {
      Console.WriteLine($"{i + 1}. {FavoriteFoods[i]}");
    }

    Console.WriteLine($"I'm going to add you to my list of friends, {userName}");

    Friend user = new Friend(userName, userAge, userFavoriteFood);

    Friends.Add(user);

    Console.WriteLine("Here are all of my friends!");

    foreach (Friend friend in Friends)
    {
      Console.WriteLine($"My name is {friend.Name}! I am {friend.Age}, and my favorite food is {friend.FavoriteFood}!");
    }

    // Friends.ForEach(friend => {});
    // Main();
  }


  private static int GetUserAge()
  {
    string ageString = Console.ReadLine();

    bool success = int.TryParse(ageString, out int age);

    // NOTE default assignments
    // int x; // 0
    // string y; // null
    // bool z; // false

    if (!success)
    {
      Console.WriteLine($"I didn't understand! I want a number, and you said {ageString}");
      return GetUserAge();
    }

    return age;
  }
}

public class Friend
{

  public string Name { get; set; }
  public int Age { get; set; }
  public string FavoriteFood { get; set; }

  // NOTE constructor
  public Friend(string name, int age, string food)
  {
    // this.Name = name;
    Name = name;
    Age = age;
    FavoriteFood = food;
  }
}
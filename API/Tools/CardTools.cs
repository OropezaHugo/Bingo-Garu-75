
namespace API.Tools;

public static class CardTools
{
    public static List<int> GenerateContentMatrix()
    {
        List<int> contentMatrix = new List<int>();
        for (int i = 0; i < 25; i++)
        {
            if (i % 5 == 0)
            {
                contentMatrix.Add(GenerateNumber(1, 16, contentMatrix));
            }
            else if ((i - 1) % 5 == 0)
            {
                contentMatrix.Add(GenerateNumber(16, 31, contentMatrix));
            }
            else if ((i - 2) % 5 == 0)
            {
                contentMatrix.Add(GenerateNumber(16, 46, contentMatrix));
            }
            else if ((i - 3) % 5 == 0)
            {
                contentMatrix.Add(GenerateNumber(46, 61, contentMatrix));
            }
            else
            {
                contentMatrix.Add(GenerateNumber(61, 76, contentMatrix));
            }
        }
        return contentMatrix;
    }

    private static int GenerateNumber(int min, int max, List<int> content)
    {
        int generatedNumber = Random.Shared.Next(min, max);
        while (content.Contains(generatedNumber))
        {
            generatedNumber = Random.Shared.Next(min, max);
        }
        return generatedNumber;
    }
}
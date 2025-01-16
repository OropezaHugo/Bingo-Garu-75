using Core.Entities;

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
                contentMatrix.Add(Random.Shared.Next(1, 16));
            }
            else if ((i - 1) % 5 == 0)
            {
                contentMatrix.Add(Random.Shared.Next(16, 31));
            }
            else if ((i - 2) % 5 == 0)
            {
                contentMatrix.Add(Random.Shared.Next(31, 46));
            }
            else if ((i - 3) % 5 == 0)
            {
                contentMatrix.Add(Random.Shared.Next(46, 61));
            }
            else
            {
                contentMatrix.Add(Random.Shared.Next(61, 76));
            }
        }
        return contentMatrix;
    }
}
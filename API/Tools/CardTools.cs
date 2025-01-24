
namespace API.Tools;

public static class CardTools
{
    public static List<int> GenerateContentMatrix()
    {
        var ranges = new List<(int start, int end)>
        {
            (1, 15),
            (16, 30),
            (31, 45),
            (46, 60),
            (61, 75)
        };
        
        List<List<int>> columns = new List<List<int>>();
        
        Random random = new Random();
        foreach (var range in ranges)
        {
            var columnNumbers = Enumerable.Range(range.start, range.end - range.start + 1)
                .OrderBy(x => random.Next())
                .Take(5)
                .ToList();
            columnNumbers.Sort();
            columns.Add(columnNumbers);
        }
        columns[2][2] = -1;
        List<int> board = new List<int>();
        for (int row = 0; row < 5; row++)
        {
            for (int col = 0; col < 5; col++)
            {
                board.Add(columns[col][row]);
            }
        }

        return board;
    }
}
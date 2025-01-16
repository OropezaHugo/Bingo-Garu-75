
using API.Tools;

namespace API.PostDTOs;

public class PostCardDTO
{
    public List<int> ContentMatrix { get; set; } = CardTools.GenerateContentMatrix();
    public required int SerialId { get; set; }
}
using Microsoft.AspNetCore.Identity;

namespace Core.Entities;

public class AppUser: BaseEntity
{
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public string? Email { get; set; }
    public string Role { get; set; }
}
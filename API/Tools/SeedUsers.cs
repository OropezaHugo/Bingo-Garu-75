using Core.Entities;
using Microsoft.AspNetCore.Identity;

namespace API.Tools;

public static class SeedUsers
{
    public static async Task CreateUsers(UserManager<AppUser> userManager)
    {
        var users = new (string Email, string Password)[]
        {
            ("admin@bingo.com", "BingoAdmin75!"), 
            ("developer@bingo.com", "2DevelopersBingo!"),
        };

        foreach (var userInfo in users)
        {
            if (await userManager.FindByEmailAsync(userInfo.Email) == null)
            {
                var user = new AppUser() { UserName = userInfo.Email, Email = userInfo.Email };
                await userManager.CreateAsync(user, userInfo.Password);
            }
        }
    }
}
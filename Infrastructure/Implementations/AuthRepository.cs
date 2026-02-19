using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using API.ResponseDTOs;
using Core.Entities;
using Core.Interfaces;
using Infrastructure.BingoContext;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace Infrastructure.Implementations;

public class AuthRepository(Bingo75Context context): IAuthRepository
{
    public async Task<AppUser?> GetUserByEmail(string email)
    {
        return await context.Users
            .FirstOrDefaultAsync(u => u.Email == email);
    }

    public async Task<AppUser> RegisterUser(AppUser user)
    {
        var newUser = context.Set<AppUser>().Add(user).Entity;
        await context.SaveChangesAsync();
        
        return newUser;
    }
    
    public string GenerateJwtToken(UserTokenInfo userInfo, string email, string role, string secretKey)
    {
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));
        var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var claims = new List<Claim>
        {
            new ("at_hash", userInfo.at_hash ?? ""),
            new ("aud", userInfo.aud ?? ""),
            new ("azp", userInfo.azp ?? ""),
            new ("email", userInfo.email ?? ""),
            new ("email_verified", userInfo.email_verified.ToString().ToLower()),
            new ("exp", userInfo.exp.ToString()),
            new ("family_name", userInfo.family_name ?? ""),
            new ("given_name", userInfo.given_name ?? ""),
            new ("iat", userInfo.iat.ToString()),
            new ("iss", userInfo.iss ?? ""),
            new ("name", userInfo.name ?? ""),
            new ("picture", userInfo.picture ?? ""),
            new ("sub", userInfo.sub ?? ""),
            new ("role", role)
        };

        var newToken = new JwtSecurityToken(
            issuer: "https://accounts.google.com",
            audience: userInfo.aud,
            claims: claims,
            expires: DateTime.UtcNow.AddDays(7),
            signingCredentials: credentials
        );

        return new JwtSecurityTokenHandler().WriteToken(newToken);
    }
}
using API.ResponseDTOs;
using Core.Entities;

namespace Core.Interfaces;

public interface IAuthRepository
{
    Task<AppUser?> GetUserByEmail(string email);
    Task<AppUser> RegisterUser(AppUser user);
    string GenerateJwtToken( UserTokenInfo token, string email, string role, string secretKey);
    
}
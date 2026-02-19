using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text.Json;
using API.ResponseDTOs;
using Core.Entities;
using Core.Interfaces;
using Google.Apis.Auth;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController(
    IConfiguration configuration,
    IAuthRepository repository
    ) : ControllerBase
{
    [HttpGet("login")]
    public IActionResult Login()
    {
        var clientId = configuration["GoogleOAuth:ClientId"];
        var redirectUri = "https://tion-profits-tests-portland.trycloudflare.com/api/auth/callback"; 

        var googleAuthUrl = $"https://accounts.google.com/o/oauth2/auth?" +
                            $"client_id={clientId}&" +
                            $"redirect_uri={redirectUri}&" +
                            $"response_type=code&" +
                            $"scope=email%20profile%20https://www.googleapis.com/auth/drive.file&" +
                            $"access_type=offline";

        return Redirect(googleAuthUrl);
    }

    [HttpGet("callback")]
    public async Task<IActionResult> Callback([FromQuery] string code)
    {
        if (string.IsNullOrEmpty(code))
        {
            return BadRequest("Código de autorización no proporcionado.");
        }

        var clientId = configuration["GoogleOAuth:ClientId"];
        var clientSecret = configuration["GoogleOAuth:ClientSecret"];
        var redirectUri = "https://tion-profits-tests-portland.trycloudflare.com/api/auth/callback"; 

        using var httpClient = new HttpClient();
        var tokenResponse = await httpClient.PostAsync("https://oauth2.googleapis.com/token",
            new FormUrlEncodedContent(new Dictionary<string, string>
            {
                {"code", code},
                {"client_id", clientId},
                {"client_secret", clientSecret},
                {"redirect_uri", redirectUri},
                {"grant_type", "authorization_code"}
            }));
        
        if (!tokenResponse.IsSuccessStatusCode)
        {
            return BadRequest(tokenResponse.Content.ReadAsStream());
        }

        var responseJson = await tokenResponse.Content.ReadAsStringAsync();
        var tokenData = JsonSerializer.Deserialize<GoogleTokenResponse>(responseJson);
        if (tokenData == null || string.IsNullOrEmpty(tokenData.id_token))
        {
            return BadRequest(responseJson);
        }

        var payload = await GoogleJsonWebSignature.ValidateAsync(tokenData.id_token);
        var email = payload.Email;

        var user = await repository.GetUserByEmail(email);

        if (user == null)
        {
            user = await repository.RegisterUser(new AppUser()
            {
                Email = email,
                FirstName = payload.Name,
                LastName = payload.FamilyName,
                Role = "admin"
            });
        }
        
        if (user == null) return Problem("error al recuperar el usuario");
        var role = user.Role;

        var jwtToken = new JwtSecurityTokenHandler().ReadJwtToken(tokenData.id_token);
        UserTokenInfo userInfo = new UserTokenInfo()
        {
            at_hash = jwtToken.Claims.FirstOrDefault(c => c.Type == "at_hash")?.Value,
            aud = jwtToken.Claims.FirstOrDefault(c => c.Type == "aud")?.Value,
            azp = jwtToken.Claims.FirstOrDefault(c => c.Type == "azp")?.Value,
            email = email,
            email_verified = jwtToken.Claims.FirstOrDefault(c => c.Type == "email_verified")?.Value == "true",
            exp = long.Parse(jwtToken.Claims.FirstOrDefault(c => c.Type == "exp")?.Value ?? "0"),
            family_name = jwtToken.Claims.FirstOrDefault(c => c.Type == "family_name")?.Value,
            given_name = jwtToken.Claims.FirstOrDefault(c => c.Type == "given_name")?.Value,
            iat = long.Parse(jwtToken.Claims.FirstOrDefault(c => c.Type == "iat")?.Value ?? "0"),
            iss = jwtToken.Claims.FirstOrDefault(c => c.Type == "iss")?.Value,
            name = jwtToken.Claims.FirstOrDefault(c => c.Type == "name")?.Value,
            picture = jwtToken.Claims.FirstOrDefault(c => c.Type == "picture")?.Value,
            sub = jwtToken.Claims.FirstOrDefault(c => c.Type == "sub")?.Value
        };
        var secretKey = configuration["Jwt:SecretKey"];
        if (string.IsNullOrEmpty(secretKey)) return BadRequest();
        var generateJwtToken = repository.GenerateJwtToken(userInfo, email, role, secretKey);

        Response.Cookies.Append("auth_token", generateJwtToken, new CookieOptions
        {
            HttpOnly = false,
            Secure = false,
            SameSite = SameSiteMode.Lax
        });

        return Redirect($"https://tion-profits-tests-portland.trycloudflare.com/");
    }
    
    [HttpGet("email/{email}")]
    public async Task<ActionResult<AppUser>> GetUserByEmail(string email)
    {
        var user = await repository.GetUserByEmail(email);
        return Ok(user);
    }
}